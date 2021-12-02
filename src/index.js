const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const {MongoClient} = require('mongodb');
const cors = require('cors');
const app = express();
// const riddles = require('./riddles.js');

app.use(cors());

// get DB info
let riddlesArr;

async function main() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    findListings(client);
  }

  main().catch(console.error);

  async function findListings(client) {
    const cursor = client
      .db('escape_room')
      .collection('riddles')
      .find()
  
    const results = await cursor.toArray();
    riddlesArr = results;
    console.log(riddlesArr);
  }


// get riddles
app.get('/riddles',(request,response) => {
    response.json({ message: {riddlesArr} });
});

// post route to DB

// get route for top scores

app.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});