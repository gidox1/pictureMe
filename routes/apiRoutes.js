'use strict';

const express = require('express');
const router = express.Router();
const Auth = require('../src/auth');
const auth = new Auth();
const User = require('../src/controllers/user')
const UserController = new User();
const Gallery = require('../src/controllers/gallery')
const galleryController = new Gallery()
const multer = require('multer');
const upload = multer();

router.post('/create', (req, res) => UserController.create(req, res));
router.get('/user', (req, res) => UserController.getUser(req, res));
router.post('/login', (req, res) => UserController.login(req, res));
router.get('/auth', auth.VerifyToken,  (req, res) =>  galleryController.authenticated(req, res))
router.post('/upload', upload.single('imageUploaded'), (req, res) => galleryController.upload(req, res));
router.get('/gallery', (req, res) =>  galleryController.gallery(req, res))
router.get('/getUser', (req, res) =>  UserController.getUser(req, res))


module.exports = router;
