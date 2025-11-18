import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/readme/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  try {
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const readmeResponse = await axios.get(readmeUrl, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });
    res.send(readmeResponse.data);
  } catch (error) {
    res.status(404).send("README not found.");
  }
});

router.post("/summarize", async (req, res) => {
  const { readme } = req.body;

  try {
    const truncatedReadme = readme.slice(0, 3000);

    // Call Gemini API (use correct endpoint + model)
    const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
        contents: [
        { parts: [{ text: `Your task is to provide a concise summary (2-3 sentences) of the following repository's README. The README might contain a lot of code. Do not return the code itself. Instead, describe the code's purpose and what the repository does. Here is the README content:\n\n${truncatedReadme}` }] }
        ],
    },
    {
        headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
        }
    }
    );


    const summary = response.data.candidates[0].content.parts[0].text;
    res.json({ summary });
  } catch (error) {
    console.error(
      "Gemini API error:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ summary: "Failed to generate summary. Please try again later." });
  }
});

export default router;
