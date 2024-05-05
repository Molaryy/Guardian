const express = require('express');
const openai = require('openai');
const bodyParser = require('body-parser');

const app = express();
const llm = new LLM();

// Body parser middleware
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route to handle POST requests to /openai
app.post('/openai', (req, res) => {
  try {
    const prompt = req.body.prompt;
    const msg = llm.askGPT(prompt);
    res.json({ url: msg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// LLM class definition
class LLM {
  constructor(model = "dall-e-3", chatHistory = [], configurationPrompt = "dalle") {
    this.client = new openai.OpenAI();
    this.model = model;
    this.chatHistory = chatHistory;
    this.configurationPrompt = configurationPrompt;
  }

  async askGPT(userInput) {
    try {
      const response = await this.client.images.generate({
        model: this.model,
        prompt: userInput,
        size: "1024x1024",
        quality: "standard",
        n: 1
      });
      return response.data[0].url;
    } catch (err) {
      throw new Error(`Failed to generate response: ${err.message}`);
    }
  }
}
