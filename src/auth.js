'use strict';

const jwt = require('jsonwebtoken');
const config = require('../src/config');
const auth_key = config.auth_key;
const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require('bcrypt');


class Authenticate {

    /*
    * Handles Authentication with
    * jwt
    */
    getToken(userParams, checkParams, payload) {
        
        const {userEmail, userPassword} = userParams;
        const {checkEmail, checkPassword} = checkParams;

        return new Promise((resolve) => {
            if(userEmail === checkEmail && userPassword === checkPassword) {
                jwt.sign({payload}, auth_key,
                    {
                        expiresIn: '6h'
                    },
                    (err, token) => {
                        if(err) console.log(err)
                        return resolve(token);
                    }
                )
            }
        })
    }

    /*
    * Generates Hash for passwords with
    * Bcrypt
    */
   async hashPassword (password) {
         const hash = await new Promise((resolve) => {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
                return resolve(hashedPassword);
            })
            .catch(error => {
                console.log(`Could'nt hash password`, error);
            })
        })
        return hash
   }

   /*
    * Compare Hash for passwords with
    * Bcrypt
    */
   async comparePassword(password, hash) {
       console.log('comparing...', password, hash)
       const compare = await new Promise((resolve) => {
           bcrypt.compare(password, hash)
                .then(result => {
                    console.log('result', result);
                    return resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    return error;
                })
       })
       console.log(compare)
       return compare;
   }

   /**
    * Verify Token to Protect route
    */
   async VerifyToken(req, res, next) {
       console.log("GOT IN HERE ", req.headers.authorization)
    const access_token = req.headers.authorization;

       if (access_token) {
            await jwt.verify(access_token, auth_key, function(err, decoded) {       
                if (err) {
                    console.log(err, 'failed to authenticate token')
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                res.locals.user = decoded; 
                next();
            }
        });
    
        } else {
            return res.status(403).send({ 
                status: 'error', 
                message: 'User not authenticated. Please log in' 
            });
        }
   }
}

module.exports = Authenticate;