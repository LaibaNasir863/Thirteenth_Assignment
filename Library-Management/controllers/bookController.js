const Book = require("../models/bookModel");

const fields = [
  "title",
  "author",
  "category",
  "publishedYear",
  "available"
];

function parsedId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid book ID"
    });
    return null;
  }

  return id;
}

function validateBook(data, partial = false) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "JSON object required";
  }

  const keys = Object.keys(data);

  if (keys.some(key => !fields.includes(key))) {
    return "Unknown book field";
  }

  if (partial && keys.length === 0) {
    return "At least one field is required";
  }

  if (!partial && fields.some(key => !Object.hasOwn(data, key))) {
    return "All book fields are required";
  }

  for (const name of ["title", "author", "category"]) {
    if (
      Object.hasOwn(data, name) &&
      (typeof data[name] !== "string" || !data[name].trim())
    ) {
      return `${name} must be a non-empty string`;
    }
  }

  if (
    Object.hasOwn(data, "publishedYear") &&
    (
      !Number.isInteger(data.publishedYear) ||
      data.publishedYear < 1450 ||
      data.publishedYear > new Date().getFullYear() + 1
    )
  ) {
    return "publishedYear must be a valid year";
  }

  if (
    Object.hasOwn(data, "available") &&
    typeof data.available !== "boolean"
  ) {
    return "available must be true or false";
  }

  return null;
}

function getBooks(req, res) {
  res.json({
    success: true,
    data: Book.findAll()
  });
}

function getBookById(req, res) {
  const id = parsedId(req, res);
  if (id === null) return;

  const book = Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json({
    success: true,
    data: book
  });
}

function searchBooks(req, res) {
  const title = req.query.title;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Query parameter 'title' is required"
    });
  }

  res.json({
    success: true,
    data: Book.searchByTitle(title.trim())
  });
}

function getAvailableBooks(req, res) {
  res.json({
    success: true,
    data: Book.findAvailable()
  });
}

function createBook(req, res) {
  const error = validateBook(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  const book = Book.create(req.body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book
  });
}

function replaceBook(req, res) {
  const id = parsedId(req, res);
  if (id === null) return;

  const error = validateBook(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  const book = Book.replace(id, req.body);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json({
    success: true,
    message: "Book replaced successfully",
    data: book
  });
}

function patchBook(req, res) {
  const id = parsedId(req, res);
  if (id === null) return;

  const error = validateBook(req.body, true);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  const book = Book.update(id, req.body);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json({
    success: true,
    message: "Book updated successfully",
    data: book
  });
}

function deleteBook(req, res) {
  const id = parsedId(req, res);
  if (id === null) return;

  if (!Book.remove(id)) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json({
    success: true,
    message: "Book deleted successfully"
  });
}

module.exports = {
  getBooks,
  getBookById,
  searchBooks,
  getAvailableBooks,
  createBook,
  replaceBook,
  patchBook,
  deleteBook
};
