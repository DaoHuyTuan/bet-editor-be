import {
  Model,
  Table,
  Column,
  PrimaryKey,
  BelongsToMany
} from 'sequelize-typescript'
import { MovieCategory } from '../movie-category/MovieCategory'
import { Movie } from '../movie/Movie'
import { DataTypes } from 'sequelize'

export interface ICategory {
  id: string
  name: string
  value: string
}

@Table
class Category extends Model {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  })
  id: string
  @Column({ allowNull: true }) name: string
  @Column value: string
  @BelongsToMany(() => Movie, () => MovieCategory)
  movies: Movie[]
}

export { Category }
