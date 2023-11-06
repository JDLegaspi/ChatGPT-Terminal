//Initialize the OpenAI SDK
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

type ChatMessage = (message: string) => void;

type OnResponseCompleted = (messages: ChatCompletionRequestMessage[]) => void;

type Initialise = (
  onResponseChange?: ChatMessage,
  onResponseCompleted?: OnResponseCompleted
) => Promise<void>;

type Chat = (
  userInput: string,
  onResponseChange?: ChatMessage,
  onResponseCompleted?: OnResponseCompleted
) => Promise<void>;

export const OpenAI: (
  apiKey: string,
  systemPrompt?: string,
  useGPT4?: boolean
) => {
  chat: Chat;
  initialise: Initialise;
  messages: ChatCompletionRequestMessage[];
} = (apiKey, systemPrompt, useGPT4 = false) => {
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

  const createCompletion = async (
    userInput: string,
    onResponseChange?: ChatMessage
  ) => {
    try {
      messages.push({
        role: "user",
        content: userInput,
      });

      const res = await openai.createChatCompletion(
        {
          model: useGPT4 ? "gpt-4-1106-preview" : "gpt-3.5-turbo",
          messages,
          stream: true,
        },
        { responseType: "stream" }
      );

      const result = await new Promise<null | ChatCompletionRequestMessage[]>(
        (resolve, rej) => {
          (res.data as any).on("data", async (data: any) => {
            const lines = data
              .toString()
              .split("\n")
              .filter((line: any) => line.trim() !== "");

            for (const line of lines) {
              const message = line.replace(/^data: /, "");
              if (message === "[DONE]") {
                resolve(messages); // Stream finished
              }
              try {
                const parsed = JSON.parse(message);

                const lastMessage = messages[messages.length - 1];
                const newMessageContent = parsed.choices[0].delta.content;

                if (newMessageContent !== undefined) {
                  if (lastMessage.role === "assistant") {
                    lastMessage.content += newMessageContent;

                    if (onResponseChange) onResponseChange(newMessageContent);
                  } else {
                    messages.push({
                      role: "assistant",
                      content: newMessageContent,
                    });

                    if (onResponseChange) onResponseChange(newMessageContent);
                  }
                }
              } catch (error) {
                // No-op
                rej(null);
              }
            }
          });
        }
      );

      if (onResponseChange) onResponseChange("");
      return result;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  const chat: Chat = async (
    userInput,
    onResponseChange,
    onResponseCompleted
  ) => {
    try {
      const res = await createCompletion(userInput, onResponseChange);

      if (onResponseCompleted) onResponseCompleted(res ?? []);
    } catch (e: any) {
      console.error("Error: " + e);
    }
  };

  const initialise: Initialise = async (
    onResponseChange,
    onResponseCompleted
  ) => {
    try {
      const res = await createCompletion(
        "What is the first thing you say?",
        onResponseChange
      );

      if (onResponseCompleted) onResponseCompleted(res ?? []);
    } catch (e: any) {
      console.error("Error: " + e);
    }
  };

  return {
    chat,
    messages,
    initialise,
  };
};
