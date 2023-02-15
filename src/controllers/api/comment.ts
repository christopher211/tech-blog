import express from 'express';
import Comment from '~/models/Comment';

const commentApi = express.Router();

// GET all comments using findAll
commentApi.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single comment
commentApi.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a new comment
// post example:
// {
//   "content": "This is a comment"
// }
commentApi.post('/create', async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const comment = await Comment.create({
      content,
      blogId,
      userId: req.session.user_id,
    });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update a comment
commentApi.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.update(
      {
        content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a comment
commentApi.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default commentApi;
