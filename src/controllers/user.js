'use strict'; 

const UserService = require('../services/users');
const userService = new UserService();

class User {

    async create(req, res) {
        if(req.body.hasOwnProperty('userData')) {
            const data = req.body.userData;
            if(!data.username || !data.password || !data.email || !data.preference || !data.sex) {
                return res.json({error: "Validation Error"}).status(400)
            }

            return userService.create(data)
                .then(Response => {
                    return res.send(Response);
                })
                .catch(async error => {
                    return res.json({error: error}).status(400)
                })
        }
        return res.json({error: "Validation Error"}).status(400)
    }



    login(req, res) {
        if(req.body.hasOwnProperty('userData')) {
            const data = req.body.userData;
            if(!data.email || !data.password) {
                return res.json({error: "Validation Error"}).status(400)
            }
            return userService.login(data)
                .then(Response => {
                    return res.send(Response);
                })
                .catch(error => {
                    return res.json({error: error}).status(400)
                })
        }
    }

}

module.exports = User;