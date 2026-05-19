const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Post = require("./models/Post");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB 連線成功");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/api/posts", async (req, res) => {

  const posts = await Post.find().sort({ createdAt: -1 });

  res.json(posts);
});

app.post("/api/posts", async (req, res) => {

  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    codeSnippet: req.body.codeSnippet
  });

  await newPost.save();

  res.json(newPost);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
