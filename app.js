import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.js"

dotenv.config();

const app = express();
const port = 3000;
  
//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.json()); 

//Routes
app.use('/',indexRoutes);

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
});