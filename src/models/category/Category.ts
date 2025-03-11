import {
  Model,
  Table,
  Column,
  PrimaryKey,
  BelongsToMany
} from 'sequelize-typescript'
import { MovieCategory } from '../movie-category/MovieCategory'
import { Movie } from '../movie/Movie'

export interface ICategory {
  id: string
  name: string
  value: string
}

@Table
class Category extends Model {
  @PrimaryKey @Column id: string
  @Column name: string
  @Column value: string
  @BelongsToMany(() => Movie, () => MovieCategory)
  movies: Movie[]
}

export { Category }
