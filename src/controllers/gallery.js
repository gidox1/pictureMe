'use strict';

const GalleryService = require('./../services/gallery');
const galleryService = new GalleryService();

class Gallery {


    authenticated(req, res) {
       return res.json({status: true}).status(200)
    }

    upload(req, res) {
        const buffer = req.file.buffer
        const email = 'biddey@hmail.com';
        const payload = {email, buffer};

        if(req.file) {
            return galleryService.upload(payload)
                .then(uploadCallback => {
                    return res.status(200).json({image_url: uploadCallback.body.image_url});
                })
                .catch(error => {
                    logger.log(error)
                })
        }
    }

    gallery(req, res) {
        const id = 1;
        return galleryService.gallery(id)
            .then(Response => {
                const data = JSON.parse(JSON.stringify(Response));
                return res.status(200).json({imageData: data});
            })
            .catch(error => {
                return error
            })
    }
}

module.exports = Gallery;