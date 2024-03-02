import { Router } from 'express'
import { Post } from './Post'
import PostController from '../../controllers/post'

export const postRouter = () =>
  Router()
    .get('/posts', PostController.get_posts)

    .get('/posts/:id', (req, res, next) =>
      Post.findByPk(req.params.id)
        .then(post => (post ? res.json(post) : next({ statusCode: 404 })))
        .catch(next)
    )

    .post('/posts', (req, res, next) =>
      Post.create(req.body)
        .then(post => res.json(post))
        .catch(next)
    )
