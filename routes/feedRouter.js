const express = require('express');

const feedController = require('../controllers/feedController')
const authController = require('../controllers/authController')
const router = express.Router();

router.get('/test', authController.protectRoute, feedController.testFeed)
router.get('/safe', (req, res) => {
    res.status(200).json({msg: 'SAFE'})
})


module.exports = router