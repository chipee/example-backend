const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const api = require('./api/api.js')
const utils = require('./utils/utils.js');

app.get('/', (req, res) => {
    res.redirect('/api')
});

app.use('/api', api)

app.listen(port, (err) => {
    if(err){
        return console.log("Something bad happen", err);
    }

    console.log(`Server is listenig on port ${port}`);
});