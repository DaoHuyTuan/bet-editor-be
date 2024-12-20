import { Post } from '../models/post/Post'
import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user/User'

export const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  port: 6789,
  models: [Post, User],
  database: 'node_pg_db',
  username: 'root',
  password: '123123',
  storage: ':memory:'
})
