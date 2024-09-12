import { Router } from 'express'
import MediaController from '../../controllers/media'
import { validateToken } from '../../middlewares/validate-token'

export const mediaRouter = () =>
  Router().post('/upload', validateToken, MediaController.upload)
