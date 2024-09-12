import express from 'express'
import strongErrorHandler from 'strong-error-handler'
import { json } from 'body-parser'
import cors from 'cors'
import { postRouter } from './models/post/post-router'
import { userRouter } from './models/user/user-router'
import { authRouter } from './models/auth/auth-router'
import { mediaRouter } from './models/media/media-router'
export const app = express()

app.use(cors())
app.use(json())

// Create main API router
const apiRouter = express.Router()

// Create admin router
const adminRouter = express.Router()

// Mount public routes
apiRouter.use('/posts', postRouter())
apiRouter.use('/auth', authRouter())
apiRouter.use('/media', mediaRouter())
apiRouter.use('/users', userRouter().publicRoutes)

// Admin user routes
adminRouter.use('/users', userRouter().adminRoutes)

app.use('/api/v1', apiRouter)
app.use('/api/v1/admin', adminRouter)
app.use(
  strongErrorHandler({
    debug: true
  })
)
