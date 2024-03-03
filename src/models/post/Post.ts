import { Model, Table, Column, PrimaryKey, IsUUID } from 'sequelize-typescript'

export interface PostMetadata {
  title: string
  url: string
}

@Table
export class Post extends Model {
  @IsUUID(5) @PrimaryKey @Column id: string
  @Column post_id!: number
  @Column contents!: string
  @Column title!: string
  @Column isPublish!: boolean
  @Column type!: string
  @Column metadata!: PostMetadata
}
