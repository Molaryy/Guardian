const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors'); // Import CORS middleware
const axios = require('axios'); // Import axios for making HTTP requests
const bodyparser = require('body-parser');
const OpenAI = require("openai")

dotenv.config()

const app = express();
app.use(bodyparser.json());
const port = 5001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());

app.post('/openai', async (req, res) => {
  const resu = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.body.prompt,
    n: 1,
    size: '1024x1024'
  })
  const url = resu.data[0].url;
  console.log(url)

  res.status(200).json({
    success: true,
    data: url
  });
});

app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
