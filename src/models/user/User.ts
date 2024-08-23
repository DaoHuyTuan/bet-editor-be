import { Model, Table, Column, PrimaryKey, Default } from 'sequelize-typescript'

@Table
class User extends Model {
  @PrimaryKey @Column address: string
  @Column name: string
  @Default('normal') @Column role: string
  @Default(0) @Column nonce: number
  @Column signature: string
  @Column salt: string
}
export { User }
