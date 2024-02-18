import { where } from 'sequelize'
const Post = require('../models/post')
exports.get_posts = (req: any, res: any, next: any) => {
  Post.findAll()
    .then((posts: any) => {
      res.status(200).json({ posts: posts })
    })
    .catch((err: any) => console.log(err))
}

exports.create_post = (req: any, res: any, next: any) => {}

exports.publish_post = (req: any, res: any, next: any) => {}

exports.delete_post = (req: any, res: any, next: any) => {}

exports.update_post = (req: any, res: any, next: any) => {}
