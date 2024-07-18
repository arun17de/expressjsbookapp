const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data - in-memory array
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2020 },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2021 },
];

// Routes

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);
    if (!book) {
        res.status(404).send('Book not found');
    } else {
        res.json(book);
    }
});

// POST a new book
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).send('Title, author, and year are required');
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };
    books.push(newBook);
    res.json(newBook);
});

// PUT (update) book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, year } = req.body;
    const bookToUpdate = books.find(book => book.id === bookId);
    if (!bookToUpdate) {
        return res.status(404).send('Book not found');
    }

    bookToUpdate.title = title;
    bookToUpdate.author = author;
    bookToUpdate.year = year;

    res.json(bookToUpdate);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(book => book.id !== bookId);
    res.send('Book deleted');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
