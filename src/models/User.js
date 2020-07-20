'use strict';

const bookshelf = require('../bookshelf');

let User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,

    fetchByColums: async function(email, columns = ['id', 'email', 'last_name']) {
        return await new User()
            .query((qb) => {
                qb.where('email', '=', email);
            })
            .fetch({columns: columns});
    },

        
    fetchUserById: async function(user_id) {
        return await new User()
                .query((qb) => {
                    qb.where('id', '=', user_id);
                })
                .fetchAll();
    }
})


module.exports = bookshelf.model('User', User);