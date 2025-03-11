import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Movie } from '../movie/Movie'
import { Category } from '../category/Category'
import { DataTypes } from 'sequelize'

@Table
export class MovieCategory extends Model {
  @ForeignKey(() => Movie)
  @Column({
    type: DataTypes.UUID,
    allowNull: false
  })
  movie_id: string
  @ForeignKey(() => Category)
  @Column({
    type: DataTypes.UUID,
    allowNull: false
  })
  category_id: string
}
