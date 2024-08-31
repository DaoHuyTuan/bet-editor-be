import { Post } from '../models/post/Post'
import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user/User'

export const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  models: [Post, User],
  database: 'node_pg_db',
  username: 'zyye',
  password: '123123',
  storage: ':memory:'
})
