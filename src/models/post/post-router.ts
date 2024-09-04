import { Router } from 'express'
import PostController from '../../controllers/post'

export const postRouter = () =>
  Router()
    .post('/', PostController.get_posts)

    .post('/create', PostController.create_post)
