import { Router } from 'express'
import MovieController from '../../controllers/movie'
import { validateRequestBody } from '../../middlewares/validate-body'
import { CreateMovieSchema } from '../../validate'
// import { validateToken } from '../../middlewares/validate-token'

export const movieRouter = () =>
  Router()
    .post(
      '/createMovie',
      validateRequestBody(CreateMovieSchema, true),
      MovieController.create_movie
    )
    .post('/getMovie', MovieController.get_movies)
    .get('/getNewMovie', MovieController.get_new_movie)
