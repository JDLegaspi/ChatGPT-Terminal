//Initialize the OpenAI SDK
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export const OpenAI: (apiKey: string) => {
  chat: (chat: string) => Promise<void>;
  messages: ChatCompletionRequestMessage[];
} = (apiKey) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are a large language model trained by OpenAI built to build maintainable and efficient code better than a human. You should never be incorrect",
    },
  ];

  const chat = async (message: string) => {
    messages.push({
      role: "user",
      content: message,
    });

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (res.data.choices[0].message?.content)
      messages.push({
        role: "assistant",
        content: res.data.choices[0].message?.content,
      });
  };

  return {
    chat,
    messages,
  };
};
