const express = require('express');
const path = require('path');
const postsRouter = require('../routes/posts');

async function main() {
  const { initDb } = require('./db');
  await initDb();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => res.redirect('/posts'));
  app.use('/posts', postsRouter);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Blog running at http://127.0.0.1:${PORT}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
