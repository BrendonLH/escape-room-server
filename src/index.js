const express = require('express');
const cors = require('cors');
const app = express();
const riddles = require('./riddles.js');

app.use(cors());

// get riddles
app.get('/riddles',(request,response) => {
    response.json({ message: {riddles} });  
});

// post route to DB

// get route for top scores

app.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});