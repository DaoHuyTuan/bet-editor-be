import { DataTypes } from 'sequelize'
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  Default,
  BelongsToMany,
  BeforeValidate
} from 'sequelize-typescript'
import { MovieActress } from '../movie-actress/MovieActress'
import { Movie } from '../movie/Movie'

// import { ICategory } from '../category/Category'

@Table
class Actress extends Model {
  @PrimaryKey @Default(DataTypes.UUIDV4) @Column id: string
  @Column({
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Field 'name' is require"
      },
      notNull: {
        msg: 'Name is require'
      }
    }
  })
  name: string
  @Column({
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Field "value" is require' },
      notNull: {
        msg: 'Value is require'
      }
    }
  })
  value: string
  @Column({ allowNull: true }) image: string
  @BelongsToMany(() => Movie, () => MovieActress)
  movies: Movie[]

  @BeforeValidate
  static sanitizeUndefined(instance: Actress) {
    // Nếu value là undefined, gán giá trị mặc định để tránh lỗi WHERE
    if (instance.value === undefined) {
      throw new Error('Field "value" is required and cannot be undefined')
    }
    if (instance.name === undefined) {
      throw new Error('Field "name" is required and cannot be undefined')
    }
  }
}
export { Actress }
