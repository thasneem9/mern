import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('API is running...');
});


const addPost = async ({ title, content, author }) => {
  try {
    const query = `
      INSERT INTO posts (post_title, post_content, post_author)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, content, author];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error in addPost:', error);
    throw error;
  }
};

// POST endpoint to use addPost
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newPost = await addPost({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while adding post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
