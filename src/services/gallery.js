'use strict';

const UserModel = require('./../models/User');
const utils = require('./../utils');
const ImageModel = require('./../models/image')
const logger = require('turbo-logger').createStream({});


class Gallery {

    /**
     * upload Image to Cloudinary
     */
    async upload(payload) {

        return new Promise(async (resolve, reject) => {

            return new UserModel()
                .where({email: payload.email})
                .fetch({columns: ['id']})
                .then(async userId => {
                    const parsedObject = JSON.parse(JSON.stringify(userId))
                    const user_id = parsedObject.id;

                    const data = await new utils().cloudinaryUploader(payload.buffer);
                    console.log(data, "UPLOADED DATA", user_id)
                    const responseObject = {
                                image_url: data.secure_url, uploaded_by: user_id, public_id: data.public_id
                            }
                    
                    await new ImageModel()
                        .save(responseObject, {method: 'insert'})
                        .then(() => {
                            logger.log('Image saved');
                            resolve({
                                status: true,
                                body: {
                                    image_url: responseObject.image_url,
                                }
                            })
                        })  
                        .catch(error => {
                            logger.log(error);
                            reject({status: false, message: 'could not upload image', error});
                        })     
                })
                .catch(error => {
                    logger.log(error);
                    reject({status: false, message: 'internal server error'});
                })    
        })
    }

    gallery(id) {
        return new ImageModel().fetchAll();
    }
}

module.exports = Gallery;