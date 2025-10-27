import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { log } from "console";

const router = express.Router();

router.get('/',(res,req)=>{
  res.render("index.ejs");
});

router.get('/search', async(req,res)=>{
  // const query = req.body.query;
  // const description = req.body.description;
  const {query, description} = req.body;

  // TODO: Use AI to enhance search query
  // const searchQuery = query + " " + description ...This is the older way
  const searchQuery = `${query} ${description}`;

  //GitHub API Call
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=10`;
  try{
    const response = await axios.get(url,{
      header: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const repos = response.data.item;
    res.render('results', {repos});
  }catch(error){
    console.error(error);
    res.send("Error fetching repositories")    
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export default router;