import { Model, Table, Column, PrimaryKey, IsUUID } from 'sequelize-typescript'

@Table
export class Post extends Model {
  @IsUUID(5) @PrimaryKey @Column id: string
  @Column post_id!: number
  @Column contents!: string
  @Column title!: string
}
