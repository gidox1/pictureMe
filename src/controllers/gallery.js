'use strict';

const GalleryService = require('./../services/gallery');
const galleryService = new GalleryService();

class Gallery {


    authenticated(req, res) {
       return res.json({status: true}).status(200)
    }

    upload(req, res) {
        console.log("within Upload....")
        const buffer = req.file.buffer
        const email = 'biddey@hmail.com';
        const payload = {email, buffer};
        console.log(req.file, "FILE OBJ")
        if(req.file) {
            return galleryService.upload(payload)
                .then(uploadCallback => {
                    console.log(uploadCallback)
                    return res.status(200).json({image_url: uploadCallback.body.image_url});
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    gallery(req, res) {
        console.log(res.locals.user, "LOCALS")
        const id = 1;
        return galleryService.gallery(id)
            .then(Response => {
                const data = JSON.parse(JSON.stringify(Response));
                // data.map(e => console.log(e));
                return res.status(200).json({imageData: data});
            })
            .catch(error => {
                console.log(error)
                return
            })
    }
}

module.exports = Gallery;