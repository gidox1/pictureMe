'use strict';
const cloudinary = require('cloudinary').v2;
const config = require('./config');
cloudinary.config(config.cloudinary);
const logger = require('turbo-logger').createStream({});



class Utils {

    /*
     * Cloudinary config
    */
   async cloudinaryUploader(file) {
    return new Promise(async (resolve) => {
        return await cloudinary.uploader.upload_stream(file, (err, res) => {
            if(err) {logger.log('cloudinary error', err)}
            resolve(res);
        })
        .end(file)
    })

}

}

module.exports = Utils;