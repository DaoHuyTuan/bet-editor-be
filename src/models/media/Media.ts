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
class Media extends Model {
  @IsUUID(4) @PrimaryKey @Default(DataTypes.UUIDV4) @Column id: string
  @Default(DataTypes.UUIDV4) @Column post_id: string
  @Column key!: string
  @Column url!: string
  @Validate({ isIn: [['cover', 'content']] })
  @Default('content')
  @Column
  type: string
  @CreatedAt @Column({ field: 'create_at' }) create_at: number
  @Column owner: string
  @BeforeCreate static async beforeCreateHook(instance: Media) {
    instance.create_at = Math.floor(new Date().getTime() / 1000)
    return instance
  }
}
export { Media }
