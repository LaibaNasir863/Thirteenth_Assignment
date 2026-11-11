const books = require("../data/books");

function findAll() {
  return books;
}

function findById(id) {
  return books.find(book => book.id === id);
}

function searchByTitle(title) {
  return books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
}

function findAvailable() {
  return books.filter(book => book.available);
}

function create(data) {
  const id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const book = { id, ...data };
  books.push(book);
  return book;
}

function replace(id, data) {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return null;

  books[index] = { id, ...data };
  return books[index];
}

function update(id, changes) {
  const book = findById(id);
  if (!book) return null;

  Object.assign(book, changes);
  return book;
}

function remove(id) {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  searchByTitle,
  findAvailable,
  create,
  replace,
  update,
  remove
};
