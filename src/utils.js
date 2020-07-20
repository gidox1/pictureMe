'use strict';
const cloudinary = require('cloudinary').v2;
const config = require('./config');
cloudinary.config(config.cloudinary);



class Utils {

    /*
     * Cloudinary config
    */
   async cloudinaryUploader(file) {
    return new Promise(async (resolve) => {
        return await cloudinary.uploader.upload_stream(file, (err, res) => {
            if(err) {console.log('cloudinary error', err)}
            resolve(res);
        })
        .end(file)
    })

}

}

module.exports = Utils;