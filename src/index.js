const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const {MongoClient} = require('mongodb');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// store DB vars
let riddlesArr;
let scoresArr;

// get riddles
async function getRiddles() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  findListings(client);
}
async function findListings(client) {
  const cursor = client
    .db('escape_room')
    .collection('riddles')
    .find()

  const riddles = await cursor.toArray();
  riddlesArr = riddles;
  
}
// post player score to DB
async function postPlayer(player) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  client.db('escape_room').collection('scores').insertOne(player, (error,data) => {
      if(error) return console.log(error);
    })
}

// get scores from db
async function getScores() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const topScores = client
    .db('escape_room')
    .collection('scores')
    .find()
    const scores = await topScores.toArray();
    scoresArr = scores;
}



getRiddles().catch(console.error);
getScores().catch(console.error);


// get riddles from DB
app.get('/riddles',(request,response) => {
  response.json({ message: {riddlesArr} });
});
// post route to DB
app.post('/post',(request,response) => {
  postPlayer(request.body);
});
// get scores from DB
app.get('/scores', (request,response) => {
  response.json({scoresArr} );
})

app.listen(process.env.PORT || 8080, () => {
    console.log('server up and running');
});