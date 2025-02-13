import { Router } from 'express'
import ActressController from '../../controllers/actress'
// import { validateToken } from '../../middlewares/validate-token'

export const actressRouter = () =>
  Router()
    .post('/getActress', ActressController.get_actress)
    .post('/createActress', ActressController.create_actress)
// .post('/', ActressController.get_actress)
