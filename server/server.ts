// Create express app
import express, { Application } from 'express';
import bodyParser from "body-parser";
import router from './router';


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.use('/api', router )


app.use(function(req, res){
    res.status(404);
});