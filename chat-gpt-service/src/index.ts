//Initialize the OpenAI SDK
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export const OpenAI: (
  apiKey: string,
  systemPrompt?: string
) => {
  chat: (chat: string) => Promise<void>;
  initialise: () => Promise<void>;
  messages: ChatCompletionRequestMessage[];
} = (apiKey, systemPrompt) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        systemPrompt ??
        "You are John, large language model trained by OpenAI build to talk to a user as the greatest assistant.",
    },
  ];

  const createCompletion = async (message: string) => {
    messages.push({
      role: "user",
      content: message,
    });

    const res = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });

    if (res.data.choices[0].message?.content)
      messages.push({
        role: "assistant",
        content: res.data.choices[0].message?.content,
      });
  };

  const chat = async (message: string) => {
    try {
      await createCompletion(message);
    } catch (e: any) {
      console.log("Error: " + e.response.statusText);
    }
  };

  const initialise = async () => {
    try {
      await createCompletion("What is the first thing you say?");
    } catch (e: any) {
      console.log("Error: " + e.response.statusText);
    }
  };

  return {
    chat,
    messages,
    initialise,
  };
};
