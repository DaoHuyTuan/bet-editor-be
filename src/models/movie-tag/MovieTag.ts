import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Movie } from '../movie/Movie'
import { Tag } from '../tag/Tag'

@Table
export class MovieTag extends Model {
  @ForeignKey(() => Movie) @Column movie_id: string
  @ForeignKey(() => Tag) @Column tag_id: string
}
