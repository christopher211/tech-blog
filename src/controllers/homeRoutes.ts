import express from 'express';
import Blog from '~/models/Blog';
import User from '~/models/User';

const homeRoutes = express.Router();

homeRoutes.get('/', async (req, res) => {
  // Get all blogs and JOIN with user data using sequelize and render homepage
  const blogsData = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

  // Serialize data so the template can read it
  const blogs = blogsData.map((blog) => blog.get({ plain: true }));

  console.log(blogs);

  res.render('homepage', { blogs });
});

export default homeRoutes;
