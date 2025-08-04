require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'StoryWeave',
  },
});

const generateText = async (prompt, model, res, errorMessage) => {
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const result = completion.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: errorMessage });
  }
};

const suggestTitle = (req, res) => {
  const { content } = req.body;
  const prompt = `Suggest 3 catchy blog titles for this article. Provide a simple numbered list.\n\nArticle: """${content}"""`;
  generateText(prompt, 'mistralai/mistral-7b-instruct:free', res, 'Failed to generate titles.');
};

const generateSummary = (req, res) => {
  const { content } = req.body;
  const prompt = `Summarize this blog in 2-3 lines.\n\nBlog: """${content}"""`;
  generateText(prompt, 'mistralai/mistral-7b-instruct:free', res, 'Failed to generate summary.');
};

const generateTags = (req, res) => {
  const { content } = req.body;
  const prompt = `Extract 5-7 SEO tags from this blog. Return as a comma-separated string.\n\nBlog: """${content}"""`;
  generateText(prompt, 'mistralai/mistral-7b-instruct:free', res, 'Failed to generate tags.');
};

module.exports = { suggestTitle, generateSummary, generateTags };