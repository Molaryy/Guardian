import openai
import requests
import numpy as np
import cv2
from urllib.request import urlopen, Request
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


@app.route('/openai/image/compare', methods=['POST', 'OPTIONS'])
def compare_images():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    try:
        json_file = request.get_json()
        app.logger.info(json_file)
        url1 = json_file['image']
        url2 = json_file['image_to_compare']

        secu = Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
        req = urlopen(secu).read()
        arr = np.asarray(bytearray(req), dtype=np.uint8)
        image1 = cv2.imdecode(arr, -1)
        secu = Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
        req = urlopen(secu).read()
        arr = np.asarray(bytearray(req), dtype=np.uint8)
        image2 = cv2.imdecode(arr, -1)
    except Exception as e:
        app.logger.error(e)
        return _corsify_actual_response(jsonify({"error": e}))
    mse_value = mse(image1, image2)
    return _corsify_actual_response(jsonify({"mse_val": mse_value}))

def mse(img1, img2):
    if len(img1.shape) == 1:
        return -1
    h1, w1 = img1.shape[:2]
    h2, w2 = img2.shape[:2]
    if h1 != h2 or w1 != w2:
        img1 = cv2.resize(img1, (w2, h2))
    diff = cv2.subtract(img1, img2)
    err = np.sum(diff ** 2)
    mse = err / (float(h2 * w2))
    return mse

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
