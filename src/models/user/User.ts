import { Model, Table, Column, PrimaryKey, Default } from 'sequelize-typescript'
import { DEFAULT_NONCE } from '../../utils/variables'

@Table
class User extends Model {
  @PrimaryKey @Column address: string
  @Column name: string
  @Default('normal') @Column role: string
  @Default(DEFAULT_NONCE) @Column nonce: string
  @Column signature: string
  @Column salt: string
}
export { User }
