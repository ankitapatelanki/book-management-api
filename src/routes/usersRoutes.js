const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUser
} = require('../controller/usersController');

const {
    registerValidator,
    loginValidator
} = require('../validator/usersValidator');

const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/register', validate(registerValidator), registerUser);

router.post('/login', validate(loginValidator), loginUser);

router.get('/profile', authMiddleware, getUser);

module.exports = router;