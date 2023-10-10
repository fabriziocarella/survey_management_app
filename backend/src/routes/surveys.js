//Imports
const { Router } = require('express');
const router = Router();

//Controllers
const { createSurvey } = require('../controllers/surveys');
const { authenticateToken } = require('../middlewares/auth');

// Routes
router.post('/api/new_survey', [authenticateToken], createSurvey);

module.exports = router;