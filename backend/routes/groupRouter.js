const express = require('express')
const groupController = require('../controllers/groupController')
const authController = require('../controllers/authController')
const router = express.Router();


router.post('/create', authController.protectRoute, groupController.createGroup)


module.exports = router;