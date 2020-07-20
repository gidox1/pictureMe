'use strict';


const bookshelf = require('../bookshelf');

let Image = bookshelf.Model.extend({
    tableName: 'images',
    hasTimestamps: true,

    fetchAllImages: async function(user_id) {
        return await new Image()
                .query((qb) => {
                    qb.where('uploaded_by', '=', user_id);
                    qb.debug(true);
                }).fetchAll();
    },

    deleteImage: async (public_id) => {
        return await new Promise(async (resolve, reject) => {
            return await new Image().query(qb => { qb.whereIn('public_id', public_id)}).destroy()
                    .then(() => {
                        return resolve(true)
                    }).catch(err => {
                        reject(err);
                    })
            })
    }

})

module.exports = bookshelf.model('Image', Image);