require('dotenv').config();

const express = require('express');
const app = express();
const userRoutes = require('./src/routes/usersRoutes');
const bookRoutes = require('./src/routes/booksRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Book Management API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
