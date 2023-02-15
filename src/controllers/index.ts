import express from 'express';
import api from './api';
import blogRoutes from './blogRoutes';
import homeRoutes from './homeRoutes';
import accountRoutes from './accountRoutes';
import dashboardRoutes from './dashboardRoutes';

const controllers = express.Router();

// Route to the API
controllers.use('/api', api);

// Route to the blog
controllers.use('/', homeRoutes);
controllers.use('/dashboard', dashboardRoutes);
controllers.use('/blog', blogRoutes);
controllers.use('/account', accountRoutes);

controllers.use((req, res) => {
  res.send('<h1>Wrong Route!</h1>');
});

export default controllers;
