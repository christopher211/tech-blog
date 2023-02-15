import express from 'express';

const accountRoutes = express.Router();

// GET /login
accountRoutes.get('/login', (req, res) => {
  res.render('login');
});

// GET /signup
accountRoutes.get('/signup', (req, res) => {
  res.render('signup');
});

export default accountRoutes;
