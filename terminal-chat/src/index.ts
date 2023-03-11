require("dotenv").config();

import * as readline from "readline";
import { OpenAI } from "@service/chat-gpt";
import { assistants } from "./const";

const apiKey = process.env.OPEN_AI_API_KEY;
const assistant = process.env.ASSISTANT;

if (!apiKey) {
  console.log("No API key, exiting...");
  process.exit();
}

const chosenAssistant = assistants[assistant ?? "default"];

const ai = OpenAI(apiKey!, chosenAssistant.systemPrompt);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion() {
  const latestAssistantMessage = ai.messages.filter(
    (m) => m.role === "assistant"
  );

  let lastMessage: string;

  if (latestAssistantMessage.length) {
    lastMessage =
      "\n" +
      latestAssistantMessage[latestAssistantMessage.length - 1].role +
      ": " +
      latestAssistantMessage[latestAssistantMessage.length - 1].content +
      "\n\nyou: ";

    rl.question(lastMessage, async (response: string) => {
      await ai.chat(response);
      askQuestion();
    });
  } else {
    await ai.initialise();
    askQuestion();
  }
}

askQuestion();
