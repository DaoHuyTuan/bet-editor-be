import { Router } from 'express'
import AuthController from '../../controllers/auth'

export const authRouter = () =>
  Router()
    .post('/auth/sign', AuthController.get_sign_message)

    .post('/auth/refresh', AuthController.refresh_token)
