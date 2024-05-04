import openai
from flask import Flask, jsonify, request, make_response

class LLM():
    def __init__(self, model="dall-e-3", chat_history=[], configuration_prompt="dalle"):
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

@app.route('/openai/endpoint', methods=['POST', 'OPTIONS'])
def get_prompt():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    try:
        json_file = request.get_json()
        app.logger.info(json_file)
        prompt = json_file['prompt']
    except Exception as e:
        app.logger.error(e)
        return _corsify_actual_response(jsonify({"error": e}))
    msg = llm.ask_gpt(prompt)
    return _corsify_actual_response(jsonify({"url": msg}))

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    app.run()
