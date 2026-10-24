const pool = require('../config/db');

const createBook = async (req, res) => {
    try {
        const { title, author, description, price } = req.body;
        const userId = req.user.id;

        const [result] = await pool.query(
            'INSERT INTO books (user_id, title, author, description, price) VALUES (?, ?, ?, ?, ?)',
            [userId, title, author, description || null, price]
        );

        return res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: {
                id: result.insertId,
                user_id: userId,
                title,
                author,
                description,
                price
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// getBooks ----
const getBooks = async( req, res) => {
    try{
        const userId = req.user.id;
        const [books] = await pool.query(
            'SELECT * FROM books WHERE user_id = ?',
            [userId]
        );

        return res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}


// updateBook ----
const updateBook = async (req, res) => {
    try {
        const { title, author, description, price } = req.body;
        const bookId = req.params.id;
        const userId = req.user.id;

        const [result] = await pool.query(
            `UPDATE books
             SET title = ?, author = ?, description = ?, price = ?
             WHERE id = ? AND user_id = ?`,
            [title, author, description || null, price, bookId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Book updated successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// deleteBook ----
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;

        const [result] = await pool.query(
            'DELETE FROM books WHERE id = ? AND user_id = ?',
            [bookId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


module.exports = {
    createBook,
    getBooks,
    updateBook,
    deleteBook
};