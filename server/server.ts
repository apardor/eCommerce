// Create express app
import express, { Application } from 'express';
import bodyParser from "body-parser";
import router from './router';


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.use('/api', router )



// Insert here other API endpoints


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});