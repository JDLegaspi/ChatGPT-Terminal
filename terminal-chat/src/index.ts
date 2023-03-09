require("dotenv").config();

import * as readline from "readline";
import { OpenAI } from "@service/chat-gpt";

const apiKey = process.env.OPEN_AI_API_KEY;

if (!apiKey) {
  console.log("No API key, exiting...");
  process.exit();
}

const ai = OpenAI(apiKey!);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
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
  } else {
    lastMessage =
      "Hi there! I'm Jimmy, a that can can help you write stuff. How can I help you?\n\nyou: ";
  }

  rl.question(lastMessage, async (response: string) => {
    await ai.chat(response);
    askQuestion();
  });
}

askQuestion();
