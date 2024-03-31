import { Request, Response } from 'express'

import { Post } from '../models/post/Post'
const get_posts = (req: Request<{}, {}, Post>, res: any, next: any) => {
  const { path } = req.body
  Post.findAll({
    where: {
      path
    }
  })
    .then((posts: Post[]) => {
      if (posts.length > 0) {
        res.status(200).json({ message: 'Post found!', posts })
      } else {
        res.status(200).json({ message: 'Post not found!' })
      }
    })
    .catch((err: any) => console.log(err))
}

const create_post = async (
  req: Request<{}, {}, Post>,
  res: Response,
  next: any
) => {
  try {
    const { path } = req.body
    const [post, created] = await Post.findOrCreate({
      where: { path }
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
  get_posts,
  create_post,
  publish_post,
  delete_post,
  update_post
}
