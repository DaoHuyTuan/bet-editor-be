import { Router } from 'express'
import MovieController from '../../controllers/movie'
// import { validateToken } from '../../middlewares/validate-token'

export const movieRouter = () =>
  Router()
    .post('/create', MovieController.create_movie)
    .post('/getMovie', MovieController.get_movies)
