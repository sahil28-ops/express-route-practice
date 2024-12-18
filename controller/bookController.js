const Author = require("./models/Author");
const Book = require("./models/Book");

const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Fetch the book by its ID and populate the author details
    const book = await Book.findById(bookId)
      .populate("authorId", "name specialization")
      .lean();

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Return the book and associated author details
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const postBook = async (req, res) => {
  try {
    const { title, theme, authorId } = req.body;

    // Check if the author exists
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Create a new book with the associated author
    const book = new Book({ title, theme, authorId });
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBook, postBook };
