import { Router } from 'express'
import AuthController from '../../controllers/auth'

export const authRouter = () =>
  Router()
    .post('/nonce', AuthController.get_nonce)

    .post('/sign', AuthController.get_sign_message)

    .post('/login', AuthController.login)

    .post('/refresh', AuthController.refresh_token)
