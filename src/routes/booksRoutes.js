const express = require('express');
const router = express.Router();

const {
    createBook,
    getBooks,
    updateBook,
    deleteBook
} = require('../controller/booksController');

const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');
const bookValidator = require('../validator/booksValidator');

router.post('/', authMiddleware, validate(bookValidator), createBook);

router.get('/', authMiddleware, getBooks);

router.put('/:id', authMiddleware, validate(bookValidator), updateBook);

router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;