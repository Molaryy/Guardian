import openai

class LLM:
    def __init__(self, api_key, model="gpt-3.5-turbo-0125", chat_history=[], configuration_prompt="you are chatGPt"):
        openai.api_key = api_key
        self.model = model
        self.chat_history = chat_history
        self.configuration_prompt = configuration_prompt

    def set_configuration_prompt(self, configuration_prompt):
        self.configuration_prompt = configuration_prompt
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[{"role": "system", "content": self.configuration_prompt}],
            max_tokens=0,
            temperature=0.7
        )

    def ask_gpt(self, max_tokens=50, temperature=0.7):

        recent_messages = self.chat_history[-5:]

        response = openai.chat.completions.create(
            model=self.model,
            messages=recent_messages,
            max_tokens=max_tokens,
            temperature=temperature
        )
        print(response)
        input_tokens = response.usage.prompt_tokens
        output_tokens = response.usage.completion_tokens
        print(f"Input tokens: {input_tokens}, Output tokens: {output_tokens}")
        print(
            f"Cost: ${0.0005 * input_tokens / 1000:.6f} for input, ${0.0015 * output_tokens / 1000:.6f} for output, Total: ${0.0005 * input_tokens / 1000 + 0.0015 * output_tokens / 1000:.6f}")
        return response.choices[0].message.content

    def chat(self, max_tokens=50, temperature=0.7):
        print("You are now chatting with ChatGPT. Type 'exit' to end the conversation.")
        while True:
            user_input = input("You: ")
            if user_input.lower() == 'exit':
                print("Goodbye!")
                break

            self.chat_history.append({"role": "user", "content": user_input})
            response = self.ask_gpt(max_tokens, temperature)
            print("ChatGPT:", response)
            self.chat_history.append({"role": "system", "content": response})

    def clear_chat_history(self):
        self.chat_history = []


def main():
    OPENAI_API_KEY = "" ##TODO: Add your OpenAI API key here (ask tomorrow to the assistant)
    llm = LLM(OPENAI_API_KEY)
    message = "Hello, how are you doing today?"
    llm.chat_history.append({"role": "user", "content": message})
    response = llm.ask_gpt(max_tokens=150, temperature=0.7)
    print("ChatGPT:", response)
    llm.chat()


if __name__ == "__main__":
    main()
