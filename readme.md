# Book Management API

A RESTful Book Management API built using Node.js, Express.js, and MySQL. This project provides user authentication and CRUD operations for managing books.

## Features

- User Registration
- User Login using JWT Authentication
- Password Hashing using bcrypt
- Request Validation using Joi
- Get User Profile
- Create a Book
- Get Books belonging to the authenticated user
- Update a Book
- Delete a Book
- MySQL Database Integration
- Environment Variables for Configuration

## Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- JSON Web Token (JWT)
- bcrypt
- Joi
- Git and GitHub
- Postman

## Project Structure

```text
book-management-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── booksController.js
│   │   └── usersController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── booksRoutes.js
│   │   └── usersRoutes.js
│   └── validator/
│       ├── booksValidator.js
│       └── usersValidator.js
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ankitapatelanki/book-management-api.git
```

### 2. Navigate to the Project

```bash
cd book-management-api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory.

Add your local configuration:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=book_management
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=1d
```

Replace the example values with your own local configuration. Never upload your `.env` file or real secrets to GitHub.

### 5. Set Up the Database

Create the database in MySQL:

```sql
CREATE DATABASE book_management;
```

Create the `users` table:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Create the `books` table:

```sql
CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 6. Start the Server

```bash
node server.js
```

The API will run on:

`http://localhost:3000`

## API Endpoints

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Log in and receive a JWT |
| GET | `/api/users/profile` | Get the authenticated user's profile |

### Book APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/books` | Create a new book |
| GET | `/api/books` | Get the authenticated user's books |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Authentication

Protected endpoints require a valid JWT token obtained from the login endpoint.

Add the token in the `Authorization` request header according to the authentication middleware configuration.

## Request Examples

### Register a User

**POST** `/api/users/register`

```json
{
  "name": "Ankita",
  "email": "ankita@example.com",
  "password": "your_password"
}
```

### Log In

**POST** `/api/users/login`

```json
{
  "email": "ankita@example.com",
  "password": "your_password"
}
```

Copy the token returned by the login API to access protected endpoints.

### Create a Book

**POST** `/api/books`

```json
{
  "title": "Node.js Basics",
  "author": "Ankita",
  "description": "A beginner-friendly book",
  "price": 499
}
```

### Update a Book

**PUT** `/api/books/1`

```json
{
  "title": "Advanced Node.js",
  "author": "Ankita",
  "description": "Updated book description",
  "price": 799
}
```

### Delete a Book

**DELETE** `/api/books/1`

Replace `1` with the actual book ID.

## Testing

The API endpoints can be tested using Postman. Test requests include user registration, login, profile retrieval, book creation, book listing, book updates, and book deletion.

## Security

- Passwords are hashed using bcrypt.
- JWT authentication protects user profile and book endpoints.
- Joi validates incoming request data.
- Database queries use parameterized placeholders.
- Environment variables keep configuration and secrets outside the source code.
- Users can update or delete only their own books.

## Author

**Ankita**

GitHub: [ankitapatelanki](https://github.com/ankitapatelanki)
