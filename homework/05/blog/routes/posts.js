const { Router } = require('express');
const { getDb, saveDb } = require('../src/db');

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const posts = db.exec('SELECT * FROM posts ORDER BY created_at DESC');
  const rows = posts[0] ? posts[0].values.map(row => ({
    id: row[0], title: row[1], content: row[2],
    created_at: row[3], updated_at: row[4]
  })) : [];
  res.render('index', { posts: rows });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const result = db.exec('SELECT * FROM posts WHERE id = ?', { bind: [req.params.id] });
  if (!result[0] || !result[0].values.length) return res.status(404).send('Not found');
  const row = result[0].values[0];
  const post = { id: row[0], title: row[1], content: row[2], created_at: row[3], updated_at: row[4] };
  res.render('post', { post });
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and content are required');
  const db = getDb();
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', { bind: [title, content] });
  saveDb();
  res.redirect('/posts');
});

module.exports = router;
