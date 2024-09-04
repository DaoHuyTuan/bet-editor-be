import { Router } from 'express'
import UserController from '../../controllers/user'
import { validateToken } from '../../middlewares/validate-token'

export const userRouter = () => {
  const publicRoutes = Router()
  const adminRoutes = Router()

  // Public routes
  publicRoutes.post('/', UserController.get_users)

  // Admin routes
  adminRoutes.post('/create', validateToken, UserController.create_user)

  return { publicRoutes, adminRoutes }
}
