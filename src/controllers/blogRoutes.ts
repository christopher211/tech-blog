import express from 'express';
import Blog from '~/models/Blog';
import Comment from '~/models/Comment';
import User from '~/models/User';
import withAuth from '~/utils/auth';

const blogRoutes = express.Router();

blogRoutes.get('/:id', withAuth, async (req, res) => {
  // Get blog by id and JOIN with user data and comment using sequelize and render blog page
  const blogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['content', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  // Serialize data so the template can read it
  const blog = blogData.get({ plain: true });

  console.log(blog);

  res.render('blog', { ...blog, loggedIn: req.session.loggedIn });
});

// POST create a new blog
blogRoutes.post('/create', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      userId: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

blogRoutes.get('/:id/edit', withAuth, async (req, res) => {
  // Get blog by id
  const blogData = await Blog.findByPk(req.params.id);

  // Serialize data so the template can read it
  const blog = blogData.get({ plain: true });

  console.log(blog);

  res.render('blog-edit', { ...blog, loggedIn: req.session.loggedIn });
});

export default blogRoutes;
