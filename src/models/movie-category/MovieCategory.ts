import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Movie } from '../movie/Movie'
import { Category } from '../category/Category'

@Table
export class MovieCategory extends Model {
  @ForeignKey(() => Movie) @Column movie_id: string
  @ForeignKey(() => Category) @Column category_id: string
}
