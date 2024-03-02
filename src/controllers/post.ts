const Posts = require('../models/post')
const get_posts = (req: any, res: any, next: any) => {
  Posts.findAll()
    .then((posts: any) => {
      res.status(200).json({ posts: posts })
    })
    .catch((err: any) => console.log(err))
}

const create_post = (req: any, res: any, next: any) => {}

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
