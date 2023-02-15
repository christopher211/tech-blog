import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '~/models/User';
import Blog from '~/models/Blog';
import Comment from '~/models/Comment';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [User, Blog, Comment],
});

export default sequelize;
