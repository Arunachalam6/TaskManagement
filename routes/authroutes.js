const express = require('express');
const { register, login, getUser } = require('../controllers/authcontroller');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
