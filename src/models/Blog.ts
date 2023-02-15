// import sequelize from sequalize-typescript
import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
  Sequelize,
} from 'sequelize-typescript';
import Comment from './Comment';
import User from './User';

// Define the Blog model with title, content, comment of user, date of creation and user id
@Table
class Blog extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public content!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @HasMany(() => Comment)
  public comments!: Comment[];

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  @CreatedAt
  public createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  @UpdatedAt
  public updatedAt!: Date;
}

export default Blog;
