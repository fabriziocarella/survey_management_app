//Imports
const { Router } = require('express');
const router = Router();

//Controllers
const { login, register } = require('../controllers/users');

// Routes
router.post('/api/register', register);
router.post('/api/login', login);

module.exports = router;