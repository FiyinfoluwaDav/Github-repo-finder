import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/summarize", async (req, res) => {
  const { readme } = req.body;

  try {
    const truncatedReadme = readme.slice(0, 5000);

    // Call Gemini API (use correct endpoint + model)
    const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
        contents: [
        { parts: [{ text: `Summarize this repository README in 2–3 sentences:\n\n${truncatedReadme}` }] }
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
