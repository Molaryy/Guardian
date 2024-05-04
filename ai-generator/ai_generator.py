import flask
import openai
from ai_flask_app import app_creation
class LLM:
    def __init__(self, api_key, model="dall-e-3", chat_history=[], configuration_prompt="you are chatGPt"):
        openai.api_key = api_key
        self.model = model
        self.chat_history = chat_history
        self.configuration_prompt = configuration_prompt

    def ask_gpt(self, user_input: str):

        recent_messages = self.chat_history[-5:]

        response = openai.images.generate(
            model=self.model,
            prompt=user_input,
            size="1024x1024",
            quality="standard",
            n=1)
        return response.data[0].url

    def chat(self, max_tokens=50, temperature=0.7):
        print("You are now chatting with Dall-e, the only mighty one! Type 'exit' to end the conversation.")
        while True:
            user_input = input("You> ")
            if user_input.lower() == 'exit':
                print("Goodbye!")
                break

            self.chat_history.append(user_input)
            response = self.ask_gpt(user_input)
            print("Dall-e>", response)
            self.chat_history.append(response)

    def clear_chat_history(self):
        self.chat_history = []

def main():
    app = app_creation()
    llm = LLM(OPENAI_API_KEY)
    llm.chat()


if __name__ == "__main__":
    main()
