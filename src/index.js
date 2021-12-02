const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const {MongoClient} = require('mongodb');
const cors = require('cors');
const app = express();
const riddles = require('./riddles.js');

app.use(cors());



async function main() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    findListings(client, 5);
  }


  main().catch(console.error);

  async function findListings(client, resultsLimit) {
    const cursor = client
      .db('sample_airbnb')
      .collection('listingsAndReviews')
      .find()
      .limit(resultsLimit);
  
    const results = await cursor.toArray();
    if (results.length > 0) {
      console.log(`Found ${results.length} listing(s):`);
      results.forEach((result, i) => {
        date = new Date(result.last_review).toDateString();
  
        console.log();
        console.log(`${i + 1}. name: ${result.name}`);
        console.log(`   _id: ${result._id}`);
        console.log(`   bedrooms: ${result.bedrooms}`);
        console.log(`   bathrooms: ${result.bathrooms}`);
        console.log(
          `   most recent review date: ${new Date(
            result.last_review
          ).toDateString()}`
        );
      });
    }
  }


// mongoose.connect(client) 
// .then( () => {
//     console.log('Connected to MongoDB');
// })

// .catch((error) => {
//     console.error('error connecting to DB', error);
// })



// get riddles
app.get('/riddles',(request,response) => {
    response.json({ message: {riddles} });  
});

// post route to DB

// get route for top scores

app.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});