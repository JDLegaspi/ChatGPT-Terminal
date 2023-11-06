# GPT4-Turbo Terminal Chat

This is a nodeJS terminal project that implements OpenAI's **new** GPT-4 turbo model, their most powerful GPT model, and allows users to interface with it in a terminal.

This project uses the `openai` package version `3.2.1` to connect to your OpenAI account and use their `gpt-4-1106-preview`` model to generate responses to user inputs. The application runs in the terminal, allowing for an easy-to-use interface for users to chat with the AI.

I've implemented proper streaming, so you don't have to wait for the API response before seeing a reply. This is crucial, especially in larger responses.

## Getting started

To get started with this project, follow these steps:

1. **Clone this repository**<br>
   `$ git clone https://github.com/JDLegaspi/ChatGPT-Terminal.git`

2. **Install dependencies recursively**<br>
   `$ pnpm i -r`

3. **Set up OpenAI API key in relevant packages**<br>
   Create an account with OpenAI and obtain your API key. Then, create `.env` files in the following directories of your project and add the following line with your API key: `OPEN_AI_API_KEY=[open_ai_api_key]`:

   - `terminal-chat/`

4. **Run the application**<br>
   To start the terminal service: `pnpm start:terminal`

5. **Send a message**
   To send a message to GPT, end your message with `;;`.

## Packages Used

- `openai`: Used for connecting to OpenAI API and sending requests.
- `readline`: Used for terminal prompt input.
