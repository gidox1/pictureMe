'use strict';
const axios = require('axios');
const config = require('./config')

const handleRequest = (jwt) => {
    return axios.get(`/api/auth`, 
        {headers: {
            Authorization: `${jwt}`,
            source: 'web'
        }})
        .then(() => {
            return true;
        })
        .catch(err => {
            return err;
        })
}

module.exports = {
    handleRequest
}