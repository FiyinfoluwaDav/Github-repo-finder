import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { log } from "console";

const router = express.Router();

router.get('/',(req,res)=>{
  res.render("index.ejs");
});

router.post('/search', async(req,res)=>{
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
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const repos = response.data.items;
    res.render('results', {repos});
  }catch(error){
    console.error(error);
    res.send("Error fetching repositories")    
  }
});


export default router;