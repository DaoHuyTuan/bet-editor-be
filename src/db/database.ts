import { Sequelize } from 'sequelize-typescript'
import { Actress } from '../models/actress/Actress'
import { Movie } from '../models/movie/Movie'
import { MovieActress } from '../models/movie-actress/MovieActress'
import { MovieCategory } from '../models/movie-category/MovieCategory'
import { MovieTag } from '../models/movie-tag/MovieTag'
import { Tag } from '../models/tag/Tag'
import { Category } from '../models/category/Category'
export const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  port: 6789,
  models: [
    Actress,
    Movie,
    Tag,
    Category,
    MovieActress,
    MovieCategory,
    MovieTag
  ],
  database: 'node_pg_db',
  username: 'root',
  password: '123123',
  storage: ':memory:'
})
