import express from 'express'
import strongErrorHandler from 'strong-error-handler'
import { json } from 'body-parser'

import { postRouter } from './models/post/post-router'

export const app = express()

app.use(json())

app.use(postRouter())

app.use(
  strongErrorHandler({
    debug: true
  })
)
