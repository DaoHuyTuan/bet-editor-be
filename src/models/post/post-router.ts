import { Router } from 'express'
import PostController from '../../controllers/post'
import { validateToken } from '../../middlewares/validate-token'

const router = Router()

export const postRouter = () =>
  router.use(
    '/v1/admin',
    validateToken,
    Router()
      .post('/posts', PostController.get_posts)

      .post('/posts/create', PostController.create_post)
  )
