import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import readmeRoutes from "./routes/readme.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json({ limit: '50mb' }));

//Routes
app.use('/',indexRoutes);
app.use('/api', readmeRoutes);

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
});