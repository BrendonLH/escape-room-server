const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/',(request,response) => {
    response.json({ message: "{add riddle object here}"})
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server up and running');
});