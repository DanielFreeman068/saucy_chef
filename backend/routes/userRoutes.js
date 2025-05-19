const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser,
    getMealPlan,
    updateMealPlan,
    clearMealPlan,
    getFavorites,
    addToFavorites
} = require('../controllers/user_controller');

const asyncWrapper = require('../middleware/async');
const protect = require('../middleware/auth');

router.post('/register', asyncWrapper(registerUser));
router.post('/login', asyncWrapper(loginUser));
router.post("/get-all", asyncWrapper(getAllUsers))
router.delete("/delete", asyncWrapper(deleteUser))

// Meal Plan Routes
router.get('/meal-plan', protect, getMealPlan);
router.put('/meal-plan', protect, updateMealPlan);
router.delete('/meal-plan', protect, clearMealPlan);

// Favorite Routes
router.get('/favorites', protect, asyncWrapper(getFavorites));
router.post('/favorites', protect, asyncWrapper(addToFavorites));

module.exports = router;
