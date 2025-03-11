import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Movie } from '../movie/Movie'
import { Actress } from '../actress/Actress'
import { DataTypes } from 'sequelize'

@Table
export class MovieActress extends Model {
  @ForeignKey(() => Movie)
  @Column({
    type: DataTypes.UUID,
    allowNull: false
  })
  movie_id: string
  @ForeignKey(() => Actress)
  @Column({
    type: DataTypes.UUID,
    allowNull: false
  })
  actress_id: string
}
