import { DataTypes } from 'sequelize'
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  BelongsToMany
} from 'sequelize-typescript'
// import { Category } from '../category/Category'
import { Actress } from '../actress/Actress'
// import { MovieCategory } from '../movie-category/MovieCategory'
import { Tag } from '../tag/Tag'
import { MovieActress } from '../movie-actress/MovieActress'
import { MovieTag } from '../movie-tag/MovieTag'
// import { MovieTag } from '../movie-tag/MovieTag'

export interface PostMetadata {
  title: string
  url: string
}

@Table
class Movie extends Model {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  })
  id: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  path: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  title: string

  @Column({
    type: DataTypes.TEXT,
    field: 'description'
  })
  description: string

  @Column({
    type: DataTypes.STRING,
    field: 'video_url'
  })
  url: string

  @Column({
    type: DataTypes.STRING,
    field: 'placeholder_image'
  })
  place_holder: string

  @BelongsToMany(() => Actress, () => MovieActress)
  actresses: Actress[]

  @BelongsToMany(() => Tag, () => MovieTag)
  tags: Tag[]

  // @BelongsToMany(() => Category, () => MovieCategory)
  // categories: Category[]
}
export { Movie }
