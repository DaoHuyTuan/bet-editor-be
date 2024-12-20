import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Movie } from '../movie/Movie'
import { Actress } from '../actress/Actress'

@Table
export class MovieActress extends Model {
  @ForeignKey(() => Movie) @Column movie_id: string
  @ForeignKey(() => Actress) @Column actress_id: string
}
