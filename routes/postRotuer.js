const express = require('express')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')

const router = express.Router();

router.post('/new', authController.protectRoute, postController.createNewPost)
router.get('/allPosts', authController.protectRoute, postController.getAllUserPosts)


module.exports = router;