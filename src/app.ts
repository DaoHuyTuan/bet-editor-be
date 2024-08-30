import express from 'express'
import strongErrorHandler from 'strong-error-handler'
import { json } from 'body-parser'
import cors from 'cors'
import { postRouter } from './models/post/post-router'
import { userRouter } from './models/user/user-router'
import { authRouter } from './models/auth/auth-router'

export const app = express()

app.use(cors())
app.use(json())

app.use(postRouter())

app.use(userRouter())

app.use(authRouter())

app.use(
  strongErrorHandler({
    debug: true
  })
)
