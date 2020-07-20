'use strict';

const http = require('http');
const express = require('express');
const app = express();
const port = 9101;
const bodyParser = require('body-parser');
const apiRoute = require('./routes/apiRoutes');
const cors = require('cors');

app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", url);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

console.log('got here');
app.use('/api', apiRoute)

app.get('*', (req, res) => {
    res.send({
        message: 'healthy',
        status: 200
    })
})

const server = http.createServer(app);

server.listen(port, () => {
    console.log('server running on ', port);
})