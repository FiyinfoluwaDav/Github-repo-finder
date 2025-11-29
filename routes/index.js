import express from "express";
import axios from "axios";

const router = express.Router();

async function generateKeywords(description) {
  if (!description) {
    return "";
  }
  try {
    const prompt = `You are a keyword extraction expert. Your task is to extract the most relevant keywords from the following description. Return the keywords as a comma-separated list. Description: '${description}'`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const generatedKeywords = response.data.candidates[0].content.parts[0].text;
    return generatedKeywords.trim();
  } catch (error) {
    console.error("Error generating keywords:", error.response?.data || error.message);
    return "";
  }
}

router.get('/',(req,res)=>{
  res.render("index.ejs");
});

router.get('/search', async (req, res) => {
  const { query, description, page = 1 } = req.query;

  const keywords = await generateKeywords(description);

  const finalQuery = `${query} in:name,description ${keywords ? keywords + " in:readme" : ""}`;

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(finalQuery)}&per_page=10&sort=stars&order=desc&page=${page}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const repos = response.data.items;
    const totalCount = response.data.total_count;
    const totalPages = Math.ceil(totalCount / 10);

    res.render('results', {
      repos,
      currentPage: parseInt(page),
      totalPages,
      query,
      description
    });
  } catch (error) {
    console.error(error);
    res.send("Error fetching repositories");
  }
});

export default router;