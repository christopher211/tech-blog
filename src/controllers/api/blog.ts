import express from 'express';
import Blog from '~/models/Blog';
import Comment from '~/models/Comment';
import User from '~/models/User';

const blogApi = express.Router();

// GET all posts using findAll
blogApi.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single post with user and comments
blogApi.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
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
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a new post
blogApi.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title,
      content,
      userId: req.session.user_id,
    });
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update a post
blogApi.put('/:id/update', async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.update(
      {
        title,
        content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a post
blogApi.delete('/:id/delete', async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default blogApi;
