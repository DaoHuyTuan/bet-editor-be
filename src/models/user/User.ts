import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript'

@Table
class User extends Model {
  @PrimaryKey @Column address: string
  @Column name: string
  @Column role: string
}
export { User }
