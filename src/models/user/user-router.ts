import { Router } from 'express'
import UserController from '../../controllers/user'
import { validateToken } from '../../middlewares/validate-token'

export const userRouter = () =>
  Router()
    .post('/users', validateToken, UserController.get_users)

    .post('/users/create', validateToken, UserController.create_user)
