const Author = require("/models/Author");
const Book = require("/models/Book");

const getAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    // Fetch the author by ID and populate their books
    const author = await Author.findById(authorId).lean();

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Fetch books written by the author
    const books = await Book.find({ authorId: authorId })
      .select("title theme")
      .lean();

    // Return the author details along with their books
    res.json({ ...author, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const postAuthor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    // Create a new author
    const author = new Author({ name, specialization });
    await author.save();

    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAuthor, postAuthor };
