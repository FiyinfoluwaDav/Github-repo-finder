import express from "express";
import axios from "axios";

const router = express.Router();

router.get('/',(req,res)=>{
  res.render("index.ejs");
});

router.post('/search', async(req,res)=>{
  // const query = req.body.query;
  // const description = req.body.description;
  const {query, description} = req.body;

  // const searchQuery = query + " " + description ...This is the older way
  const searchQuery = `${query} ${description}`;

  //GitHub API Call
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=10`;
  try{
    const response = await axios.get(url,{
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const repos = response.data.items;

    // Fetch README for each repository
    // WARNING: This can be slow due to multiple API calls.
    // A more efficient approach for production would be to fetch READMEs on demand (e.g., when the AI Summary button is clicked).
    for (let repo of repos) {
      try {
        const readmeUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`;
        const readmeResponse = await axios.get(readmeUrl, {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw' // Request raw content
          }
        });
        repo.readme = readmeResponse.data; // README content
      } catch (readmeError) {
        // If README not found, set to empty string or a message
        repo.readme = "No README found for this repository.";
        console.error(`Error fetching README for ${repo.full_name}:`, readmeError.message);
      }
    }
    res.render('results', {repos});
  }catch(error){
    console.error(error);
    res.send("Error fetching repositories")    
  }
});


export default router;