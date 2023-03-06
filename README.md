# GPT-3.5-Turbo Terminal Chat

This is a nodeJS terminal project that implements ChatGPT's gpt-3.5-turbo model, their most powerful GPT model, and allows users to interface with it in a terminal.

## Getting started

To get started with this project, follow these steps:

1. **Clone this repository**<br>
   `$ git clone https://github.com/JSON/gpt3.5-turbo-terminal-chat.git`

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