import { Router } from 'express'
import PostController from '../../controllers/post'

export const postRouter = () =>
  Router()
    .post('/posts', PostController.get_posts)

    .post('/posts/create', PostController.create_post)
