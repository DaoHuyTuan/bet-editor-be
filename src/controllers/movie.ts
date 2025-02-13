import { Request, Response } from 'express'

import { Movie } from '../models/movie/Movie'
const get_movies = (
  req: Request<{}, {}, { limit: number; page: number } & Movie>,
  res: any,
  next: any
) => {
  console.log('loole')
  const { page, limit } = req.body

  Movie.findAndCountAll({
    where: {}
  })
    .then(({ rows, count }: { rows: Movie[]; count: number }) => {
      if (rows.length > 0) {
        res
          .status(200)
          .json({ message: 'Post found!', rows, page, limit, total: count })
      } else {
        res.status(200).json({ message: 'Post not found!', rows })
      }
    })
    .catch((err: any) => console.log(err))
}

const create_movie = async (
  req: Request<{}, {}, Movie>,
  res: Response<{}, {}>,
  next: any
) => {
  try {
    const { path } = req.body
    const { address } = res.locals as { address: string }
    console.log('path', path)

    console.log('res', res)
    const [post, created] = await Movie.findOrCreate({
      where: { path },
      defaults: { ...req.body, owner: address }
    })
    console.log('post', post)
    console.log('created', created)
    if (post && !created) {
      return res.status(200).json({ message: 'Post founded', post })
    }
    if (created) {
      return res.status(201).json({ message: 'Post created', post })
    }
    if (!post && !created) {
      return res
        .status(400)
        .json({ message: 'Post not found and create fail too!' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong!', error })
  }
}

const publish_post = (req: any, res: any, next: any) => {}

const delete_post = (req: any, res: any, next: any) => {}

const update_post = (req: any, res: any, next: any) => {}

export default {
  get_movies,
  create_movie,
  publish_post,
  delete_post,
  update_post
}
