// import sequelize from sequalize-typescript
import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  DataType,
  Sequelize,
} from 'sequelize-typescript';
import Blog from './Blog';
import User from './User';

// Define the Comment model with content, blog id, user id, date of creation with associations
@Table
class Comment extends Model {
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
  public content!: string;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public blogId!: number;

  @BelongsTo(() => Blog)
  public blog!: Blog;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;

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

export default Comment;
