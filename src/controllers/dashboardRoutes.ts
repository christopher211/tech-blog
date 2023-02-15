import express from 'express';
import Blog from '~/models/Blog';
import withAuth from '~/utils/auth';

const dashboardRoutes = express.Router();

// GET /dashboard
dashboardRoutes.get('/', withAuth, async (req, res) => {
  // get all blogs of current user from session
  const blogData = await Blog.findAll({
    where: {
      userId: req.session.user_id,
    },
  });

  // serialize data so the template can read it
  const blogs = blogData.map((blog) => blog.get({ plain: true }));

  // pass serialized data and session flag into template
  res.render('dashboard', { blogs, loggedIn: req.session.loggedIn });
});

export default dashboardRoutes;
