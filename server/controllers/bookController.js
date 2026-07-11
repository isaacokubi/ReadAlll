import Book from "../models/Book.js";
import Category from "../models/Category.js";

// Add Book
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      stock,
      category,
    } = req.body;

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      stock,
      category,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("category");

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Book
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("category");

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.description =
      req.body.description || book.description;
    book.price = req.body.price || book.price;
    book.stock = req.body.stock || book.stock;
    book.category =
      req.body.category || book.category;

    if (req.file) {
      book.image = req.file.filename;
    }

    const updatedBook = await book.save();

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//search and categories controller
export const searchBooks = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";

    let query = {};

    if (keyword) {
      query.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    const books = await Book.find(query)
      .populate("category");

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};