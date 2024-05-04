from flask import Flask

app = Flask(__name__)

@app.route('/openai/images/generate', methods=['POST'])
def generate_image(url : str):
    return