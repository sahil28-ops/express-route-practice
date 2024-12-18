const express = require("express");
const Author = require("/models/Author");
const Book = require("/models/Book");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const authorId = req.params.id;

    // Fetch all books associated with this author ID, selecting only _id, title, and theme
    const books = await Book.find({ authorId }, "_id title theme").lean();

    if (!books.length) {
      return res
        .status(404)
        .json({ error: "Author not found or no books available" });
    }

    // Fetch author details
    const author = await Author.findById(
      authorId,
      "name specialization"
    ).lean();
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Combine author details with the list of books directly
    res.json({
      author,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
