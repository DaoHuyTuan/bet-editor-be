import { Router } from 'express'
import UserController from '../../controllers/user'

export const userRouter = () =>
  Router()
    .post('/users', UserController.get_users)

    .post('/users/create', UserController.create_user)
