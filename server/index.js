//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
//Follow guide to deploy on heruko
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'
import db from './config'



const app = express();
const port = process.env.PORT || global.gConfig.node_port;


//connect to database
db.mongo.init().then(() => console.log("db connected"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));