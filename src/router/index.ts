import express from 'express'
const PostController = require('../controllers/post')
const router = express.Router()

router.get('/posts', PostController.get_posts)

module.exports = router
