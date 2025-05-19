const fs = require('fs');
    const path = require('path');

    const recipesFilePath = path.join(__dirname, '../data/recipes.json');

    const createRecipe = (req, res) => {
    const newRecipe = req.body;

    // Validate basic required fields (optional, but recommended)
    if (!newRecipe.Name || !newRecipe.Category || !newRecipe.Instructions) {
        return res.status(400).json({ message: 'Missing required recipe fields.' });
    }

    // Read existing recipes
    fs.readFile(recipesFilePath, 'utf8', (readErr, data) => {
        let recipes = [];

        if (readErr && readErr.code !== 'ENOENT') {
        return res.status(500).json({ message: 'Error reading existing recipes.' });
        }

        if (data) {
        try {
            recipes = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: 'Invalid JSON in recipes file.' });
        }
        }

        // Push the new recipe
        recipes.push(newRecipe);

        console.log('Writing to:', recipesFilePath);
        // Write back to the file
        fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (writeErr) => {
        if (writeErr) {
            return res.status(500).json({ message: 'Error saving the recipe.' });
        }

        return res.status(200).json({ message: 'Recipe saved successfully!' });
        });
    });
    };

    module.exports = { createRecipe };