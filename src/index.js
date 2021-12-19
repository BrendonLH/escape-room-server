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

// get DB info
let riddlesArr;

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

  const results = await cursor.toArray();
  riddlesArr = results;
}

async function postPlayer(player) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  client.db('escape_room').collection('players').insertOne(player, (error,data) => {
      if(error) return console.log(error);
    })
}

getRiddles().catch(console.error);




// get riddles
app.get('/riddles',(request,response) => {
  response.json({ message: {riddlesArr} });
});
// post route to DB
app.post('/post',(request,response) => {
  postPlayer(request.body);
});

// get route for top scores

app.listen(process.env.PORT || 8080, () => {
    console.log('server up and running');
});