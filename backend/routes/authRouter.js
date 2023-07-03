const express = require('express');
const authController = require('../controllers/authController')


const router = express.Router();


router.route('/create-user').post(authController.createUser)
router.route('/login').post(authController.login)


module.exports = router