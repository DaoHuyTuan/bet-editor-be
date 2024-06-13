import { DataTypes } from 'sequelize'
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  Validate,
  Default,
  CreatedAt,
  BeforeCreate
} from 'sequelize-typescript'

export interface PostMetadata {
  title: string
  url: string
}

@Table
class Post extends Model {
  @IsUUID(4) @PrimaryKey @Default(DataTypes.UUIDV4) @Column id: string
  @Default(DataTypes.UUIDV4) @Column post_id: string
  @Column path!: string
  @Column contents: string
  @Default('untitle') @Column title: string
  @Default(false) @Column isPublish: boolean
  @Validate({ isIn: [['new', 'head', 'normal']] })
  @Default('normal')
  @Column
  type: string
  @CreatedAt @Column({ field: 'create_at' }) create_at: number
  @Default({ title: 'untitle', url: 'hello test' })
  @Column({ type: DataTypes.JSONB, defaultValue: {} })
  metadata: PostMetadata
  @Column owner: string
  @BeforeCreate static async beforeCreateHook(instance: Post) {
    instance.create_at = Math.floor(new Date().getTime() / 1000)
    return instance
  }
}
export { Post }
