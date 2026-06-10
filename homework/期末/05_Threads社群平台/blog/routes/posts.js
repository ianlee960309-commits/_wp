const { Router } = require('express');
const { getDb, saveDb } = require('../src/db');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.get('/', (req, res) => {
  const db = getDb();
  const posts = db.exec('SELECT * FROM posts ORDER BY created_at DESC');
  const rows = posts[0] ? posts[0].values.map(row => ({
    id: row[0], title: row[1], content: row[2], summary: row[3] || '',
    created_at: row[4], updated_at: row[5]
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
  const post = { id: row[0], title: row[1], content: row[2], summary: row[3] || '', created_at: row[4], updated_at: row[5] };
  res.render('post', { post });
});

router.post('/', (req, res) => {
  const { title, content, summary } = req.body;
  if (!title || !content) return res.status(400).send('Title and content are required');
  const db = getDb();
  db.run('INSERT INTO posts (title, content, summary) VALUES (?, ?, ?)', { bind: [title, content, summary || ''] });
  saveDb();
  res.redirect('/posts');
});

router.post('/generate-summary', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(
      `請用繁體中文為以下文章生成一段簡短摘要（50~100 字），直接輸出摘要內容即可，不要加任何前綴：\n\n${content}`
    );
    const summary = result.response.text().trim();
    res.json({ summary });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

module.exports = router;
