import express from "express";
import axios from "axios";
const router = express.Router();

router.post('/summarize', async (req, res) => {
  const { readme } = req.body;

  try {
    // Call Gemini API here
    const response = await axios.post('https://api.gemini.example/summarize', {
      prompt: `Summarize the following repository README in 2-3 sentences:\n\n${readme}`
    }, {
      headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` }
    });

    const summary = response.data.summary; // Adjust based on Gemini response
    res.json({ summary });

  } catch (error) {
    console.error(error);
    res.status(500).json({ summary: "Failed to generate summary." });
  }
});

export default router;
