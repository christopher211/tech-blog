import express, { Request, Response } from 'express';
// import sequelize from '../configs/connection';
import User from '~/models/User';

const userApi = express.Router();

// GET all users using findAll
// user.get('/', async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });

// POST create a new user
userApi.post('/signup', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    // set session variables based on the response from the database
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.status(200).json(user);
    });
    // console.log('req.session', req.session);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST login
userApi.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({
      where: {
        username,
      },
    });

    console.log('user', user);

    if (!user) {
      console.log('Goes here');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      console.log('Goes here 2');

      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.status(200).json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST logout
userApi.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    // res.status(204).end();
  } else {
    res.status(404).end();
  }
});

export default userApi;
