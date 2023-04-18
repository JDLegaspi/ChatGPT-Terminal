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

const useGPT4 = true;
const ai = OpenAI(apiKey!, chosenAssistant.systemPrompt, useGPT4);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleResponseChange = async (message: string) => {
  process.stdout.write(message);
};

const handleResponseComplete = () => {
  process.stdout.write("\n\nyou: ");
};

async function askQuestion() {
  rl.write(null, { ctrl: true, name: "u" }); // clear current user input

  try {
    const latestAssistantMessage = ai.messages.filter(
      (m) => m.role === "assistant"
    );

    if (latestAssistantMessage.length) {
      rl.question("you: ", async (userInput: string) => {
        process.stdout.write("\nassistant: ");
        await ai.chat(userInput, handleResponseChange, handleResponseComplete);
        askQuestion();
      });
    } else {
      process.stdout.write("\nassistant: ");
      await ai.initialise(handleResponseChange, handleResponseComplete);
      askQuestion();
    }
  } catch (e) {
    console.error(e);
  }
}

askQuestion();
