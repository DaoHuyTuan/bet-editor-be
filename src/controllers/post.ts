import { where } from 'sequelize'
const Post = require('../models/post')
exports.get_posts = (req: any, res: any, next: any) => {
  Post.findAll()
    .then((posts: any) => {
      res.status(200).json({ posts: posts })
    })
    .catch((err: any) => console.log(err))
}
