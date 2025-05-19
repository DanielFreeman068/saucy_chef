const express = require('express');
const router = express.Router();
const { createRecipe, deleteRecipe, getRecipes} = require('../controllers/recipe_controller');
const asyncWrapper = require('../middleware/async');

router.post('/', asyncWrapper(createRecipe));
router.delete("/delete", asyncWrapper(deleteRecipe))
router.get("/all-recipes", asyncWrapper(getRecipes))



module.exports = router;