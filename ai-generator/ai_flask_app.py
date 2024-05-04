from flask import Flask, request
import json

@app.route('/tamer', methods=['GET'])
def get_prompt():
    json_file = request.get_json()
    prompt = json_file['prompt']
    return prompt



@app.route('/openai/images/generate', methods=['POST'])
def send_image_url(url : str):
    json_file = "{'url': '" + url + "'}"
    return json.loads(json_file)