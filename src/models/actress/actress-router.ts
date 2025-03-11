import { Router } from 'express'
import ActressController from '../../controllers/actress'
import { validateRequestBody } from '../../middlewares/validate-body'
import { CreateActressSchema } from '../../validate'
// import { validateToken } from '../../middlewares/validate-token'

export const actressRouter = () =>
  Router()
    .post('/getActress', ActressController.get_actress)
    .post(
      '/createActress',
      validateRequestBody(CreateActressSchema),
      ActressController.create_actress
    )
// .post('/', ActressController.get_actress)
