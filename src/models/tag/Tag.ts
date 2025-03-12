import {
  PrimaryKey,
  Column,
  Table,
  Model,
  BelongsToMany
} from 'sequelize-typescript'
// import { Movie } from '../movie/Movie'
// import { MovieTag } from '../movie-tag/MovieTag'
import { DataTypes } from 'sequelize'
import { MovieTag } from '../movie-tag/MovieTag'
import { Movie } from '../movie/Movie'

@Table
export class Tag extends Model {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  })
  id: string

  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  name: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  value: string

  @BelongsToMany(() => Movie, () => MovieTag)
  movies: Movie[]
}
