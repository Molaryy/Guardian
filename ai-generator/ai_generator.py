import os
import openai
import sys
from flask import Flask, jsonify, request

class LLM():
    def __init__(self, model="dall-e-3", chat_history=[], configuration_prompt="dalle"):
        # key = os.getenv("OPENAI_API_KEY")
        self.client = openai.OpenAI()
        self.model = model
        self.chat_history = chat_history
        self.configuration_prompt = configuration_prompt

    def ask_gpt(self, user_input: str):
        response = (self.client.images.generate(
            model=self.model,
            prompt=user_input,
            size="1024x1024",
            quality="standard",
            n=1))
        return response.data[0].url

llm = LLM()
app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_prompt():
    try :
        # prompt = "An owl destrying chains"
        json_file = request.get_json()
        print(json_file, file=sys.stderr)
        prompt = json_file['prompt']
        print(prompt, file=sys.stderr)
    except Exception as e:
        return jsonify({"error": "404"})
    msg = llm.ask_gpt(prompt)
    print(jsonify({"url": msg}), file=sys.stderr)
    return jsonify({"url": msg})
    # respond = requests.post("http://localhost:5000/openai/images/generate", json={"url": msg})
    # return jsonify(respond.json())

if __name__ == "__main__":
    app.run()
