const express = require('express');
const router = express.Router();
const { createRecipe } = require('../controllers/recipe_controller');
const asyncWrapper = require('../middleware/async');

router.post('/', asyncWrapper(createRecipe));



module.exports = router;