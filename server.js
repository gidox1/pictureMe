'use strict';

const next = require('next')
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const logger = require('turbo-logger').createStream({});
const nextApp = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(nextApp)
const port = process.env.PORT;
const apiRoute = require('./routes/apiRoutes');

// Server with express
// TODO: Set up Helmet to prevent Javascript injection in the browser
const express = require('express')
nextApp
    .prepare()
    .then(() => {
        const app = express();
        const router = express.Router();

        //parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: true, }));
        //parse application/json
        app.use(bodyParser.json());

        app.use('/api', apiRoute)

        app.use(router);
        
        app.get('*', (req, res) => {
            return handler(req, res);
        })

        app.listen(port, err => {
            if(err) return false;
            logger.log('Server running on port: ', port);
        });
    })
    .catch(e => {
        logger.log(e)
    })
