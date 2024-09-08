import { Router } from 'express'
import PostController from '../../controllers/post'
import { validateToken } from '../../middlewares/validate-token'

export const postRouter = () =>
  Router()
    .post('/', PostController.get_posts)

    .post('/create', validateToken, PostController.create_post)
