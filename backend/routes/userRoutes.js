const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMealPlan,
    updateMealPlan,
    clearMealPlan
} = require('../controllers/user_controller');

const asyncWrapper = require('../middleware/async');
const protect = require('../middleware/auth');

router.post('/register', asyncWrapper(registerUser));
router.post('/login', asyncWrapper(loginUser));

// Meal Plan Routes
router.get('/meal-plan', protect, getMealPlan);
router.put('/meal-plan', protect, updateMealPlan);
router.delete('/meal-plan', protect, clearMealPlan);

module.exports = router;
