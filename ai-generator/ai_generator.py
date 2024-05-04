import openai
from flask import Flask, requests, jsonify, request

class LLM:
    def __init__(self, model="dall-e-3", chat_history=[], configuration_prompt="you are chatGPt"):
        openai.api_key = openai.OpenAI().api_key
        self.model = model
        self.chat_history = chat_history
        self.configuration_prompt = configuration_prompt

    def ask_gpt(self, user_input: str):
        response = openai.images.generate(
            model=self.model,
            prompt=user_input,
            size="1024x1024",
            quality="standard",
            n=1)
        return response.data[0].url

llm = LLM()
app = Flask(__name__)

@app.route('/openai/endpoint', endpoint='url', methods=['GET'])
def get_prompt():
    try :
        json_file = request.get_json()
        prompt = json_file['prompt']
    except Exception as e:
        return jsonify({"error": "404"})
    msg = llm.ask_gpt(prompt)
    if msg.isalnum():
        return jsonify({"error": msg})
    return jsonify({"url": msg})
    # respond = requests.post("http://localhost:5000/openai/images/generate", json={"url": msg})
    # return jsonify(respond.json())

if __name__ == "__main__":
    app.run()
