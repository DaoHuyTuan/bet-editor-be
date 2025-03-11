import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Movie } from '../movie/Movie'
import { Tag } from '../tag/Tag'
import { DataTypes } from 'sequelize'

@Table
export class MovieTag extends Model {
  @ForeignKey(() => Movie)
  @Column({
    type: DataTypes.UUID,
    allowNull: false
  })
  movie_id: string
  @ForeignKey(() => Tag)
  @Column({
    type: DataTypes.UUID,
    allowNull: false
  })
  tag_id: string
}
