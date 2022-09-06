// Authentication routes
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Sign up route
router.post('/signup', (req, res) => {});

// Log in route
router.post('/login', (req, res) => {});

// Log out route
router.get('/logout', (req, res) => {});

module.exports = router;
