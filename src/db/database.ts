import { Post } from '../models/post/Post'
import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  host: process.env.PG_HOST,
  dialect: 'postgres',
  models: [Post],
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  storage: ':memory:'
})
