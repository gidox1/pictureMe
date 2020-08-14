'use strict';

const _ = require('lodash');
const UserModel = require('../models/User');
// const UserService = require('')
const logger = require('turbo-logger').createStream({});
const Auth = require('./../auth');
const auth = new Auth();
const Utils = require('../utils');
const utils = new Utils();


class User {

    /* 
    * Handles User Creation
    */
    async create(userDetails) {
        return new Promise(async (resolve, reject) => {
            const creds = {
                email: userDetails.email,
                password: userDetails.password
            };
            const hashedPassword = await auth.hashPassword(userDetails.password);
            userDetails.password = hashedPassword;    
            
            //Check DB for User
            return new UserModel()
                .where({email: userDetails.email}).fetchAll()
                .then(async userArray => {
                    
                    if(userArray.length < 1 ||  userArray == null) {
                        //Save if new User
                        logger.log('User saved....');


                        return new UserModel().save(userDetails, {method: 'insert'})
                            .then(async () => {
                                const login = await this.login(creds);
                                return resolve(login);
                            })
                            .catch(err => {
                                logger.error(err)
                                return reject(err);
                            })
                    }
                    
                    logger.log('Email already registered, after db check');
                    return reject({
                        status: 'error',
                        message: 'Email already registered.',
                    });
                })
                .catch(error => {
                    logger.log('An error occured while fetching user', error);
                    return reject({
                        status: 'error',
                        object: error
                    });
                })
        })
    }


    
   /**
    * Log in new user and return token
    */
    async login(userParam) {
        const {email, password} = userParam;

        //Fetch user password from db and compare with passed password
        return new Promise((resolve, reject) => {
            const columns   = ['password', 'email'];

            return new UserModel().fetchByColums(email, columns)
                .then(async (userResponse) => {
                    const userObject = await JSON.parse(JSON.stringify(userResponse));

                    if(userObject == null) {
                        return reject({message: 'Invalid email or password'})
                    }
                    
                    const hashPassword = userObject['password'];
                    const compare = await auth.comparePassword(password, hashPassword);
                    const userParams = {email, password};
                    const checkParams = {email: userObject.email, password: userObject.password};

                    if(compare) {
                        const userToken = await auth.getToken(userParams, checkParams, userObject);
                        resolve( {
                            status: 'success',
                            token: userToken
                        })
                    } else {
                        reject({message: 'Invalid email or password'})
                    }
                })
                .catch(error => {
                    logger.log('Could not fetch user collection', error);
                })
        })
   }


   /**
    * Fetch User By ID
    */
   async fetchUserById(user_id) {
        return new Promise((resolve, reject) => {
            return new UserModel()
                .fetchUserById(user_id)
                    .then(userObject => {
                        resolve(userObject);
                    })
                    .catch(error => {
                        reject(error);
                    })
        })
   }
}

module.exports = User;
