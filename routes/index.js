import express from "express";
import axios from "axios";

const router = express.Router();

async function generateSearchQuery(query, description) {
  try {
    const prompt = `You are a GitHub search expert. Your task is to generate a GitHub search query that finds repositories based on a user's request. The user is looking for: '${query}' and has provided the following description: '${description}'. Generate a search query that is optimized to find the most relevant repositories. The query should search in the readme and description. Return only the search query.`;

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

    const generatedQuery = response.data.candidates[0].content.parts[0].text;
    return generatedQuery.trim();
  } catch (error) {
    console.error("Error generating search query:", error.response?.data || error.message);
    // Fallback to the simple query
    return `${query} ${description} in:readme,description`;
  }
}

router.get('/',(req,res)=>{
  res.render("index.ejs");
});

router.get('/search', async (req, res) => {
  const { query, description, page = 1 } = req.query;

  // Use AI to enhance search query
  const searchQuery = await generateSearchQuery(query, description);

  // GitHub API Call
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=10&sort=best-match&page=${page}`;
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