import express from 'express';
import blogApi from './blog';
import commentApi from './comment';
import userApi from './user';

const api = express.Router();

api.use('/user', userApi);
api.use('/blog', blogApi);
api.use('/comment', commentApi);

export default api;
