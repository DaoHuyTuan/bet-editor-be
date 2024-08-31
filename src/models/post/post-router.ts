import { Router } from 'express'
import PostController from '../../controllers/post'
import { validateToken } from '../../middlewares/validate-token'

export const postRouter = () =>
  Router()
    .post('/posts', validateToken, PostController.get_posts)

    .post('/posts/create', validateToken, PostController.create_post)
