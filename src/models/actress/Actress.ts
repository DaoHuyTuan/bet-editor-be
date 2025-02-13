import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript'

// import { ICategory } from '../category/Category'

@Table
class Actress extends Model {
  @PrimaryKey @Column id: string
  @Column name: string
  @Column image: string
  // @Column categories: ICategory[]
}
export { Actress }
