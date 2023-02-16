// import sequelize from sequalize-typescript
import {
  Table,
  Column,
  Model,
  BeforeUpdate,
  BeforeCreate,
  UpdatedAt,
  CreatedAt,
  HasMany,
  DataType,
  Sequelize,
} from 'sequelize-typescript';
import connection from 'src/configs/connection';
import bcrypt from 'bcrypt';
import Blog from './Blog';
import Comment from './Comment';

// Define the User model with id, name, username, email, password, date of creation, date of update
// add hooks to hash password before creating and updating user
@Table
class User extends Model {
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
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password!: string;

  @HasMany(() => Blog)
  public blogs!: Blog[];

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

  @BeforeUpdate
  @BeforeCreate
  public static async hashPassword(user: User): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // check password
  public async checkPassword(password: string): Promise<boolean> {
    console.log('password', password);
    return bcrypt.compare(password, this.password);
  }
}

export default User;
