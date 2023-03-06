# GPT-3.5-Turbo Terminal Chat

This is a nodeJS terminal project that implements ChatGPT's gpt-3.5-turbo model, their most powerful GPT model, and allows users to interface with it in a terminal.

## Why GPT-3.5-Turbo > ChatGPT
GPT-3.5-Turbo is a much larger model than ChatGPT, with 1.3 trillion parameters compared to ChatGPT's 1.7 billion parameters. This makes GPT-3.5-Turbo much more powerful and capable of handling a wider range of natural language processing tasks than ChatGPT.

GPT-3.5-Turbo is designed to perform a variety of natural language processing tasks, such as language translation, text summarization, and question-answering, among others. It has been trained on a vast amount of data from the internet, which has helped it become proficient at understanding and generating language in a wide range of domains.

In contrast, ChatGPT is designed specifically for chatbot tasks. While it has been trained on a large amount of conversational data as well, its focus is on generating engaging and natural-sounding responses in a conversational setting.

While both models are powerful and capable of performing natural language processing tasks, GPT-3.5-Turbo's larger size and more generalized training make it better suited for a wider variety of applications. Therefore, if you need a language model that can perform a wide range of natural language processing tasks, and you have the computational resources to handle its larger size, GPT-3.5-Turbo could be the better choice for you.

## Getting started

To get started with this project, follow these steps:

1. **Clone this repository**<br>
   `$ git clone https://github.com:JDLegaspi/Terminal-ChatGPT3.5-turbo.git`

2. **Install dependencies**<br>
   `$ pnpm install`

3. **Set up OpenAI API key**<br>
   Create an account with OpenAI and obtain your API key. Then, create a `.env` file in the root directory of your project and add the following line with your API key: `OPEN_AI_API_KEY=[open_ai_api_key]`

4. **Run the application**<br>
   `$ pnpm start`

## Description

This project uses the `openai` package version `3.2.1` to connect to your OpenAI account and use their GPT-3.5-Turbo model to generate responses to user inputs. The application runs in the terminal, allowing for an easy-to-use interface for users to chat with the AI.

## Packages Used

- `openai` version `3.2.1`: Used for connecting to OpenAI API and sending requests.