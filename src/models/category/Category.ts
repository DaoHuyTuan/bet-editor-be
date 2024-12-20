import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript'

export interface ICategory {
  id: string
  name: string
  value: string
}

@Table
class Category extends Model {
  @PrimaryKey @Column id: string
  @Column name: string
  @Column value: string
}

export { Category }
