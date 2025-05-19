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

const getRecipes = (req,res) =>{
    const recipesFilePath = path.join(__dirname, '../data/recipes.json');

    fs.readFile(recipesFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading recipes:', err);
            return res.status(500).json({ success: false, message: 'Failed to load recipes.' });
        }
        
        try {
            const recipes = JSON.parse(data);
            res.json(recipes);
        } catch (parseErr) {
            res.status(500).json({ success: false, message: 'Invalid JSON format.' });
        }
    });
}

const deleteRecipe = (req, res) => {
    const { adminPassword, idMeal } = req.body;
    
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ success: false, message: 'Access denied. Invalid admin password.' });
    }
    
    if (!idMeal) {
        return res.status(400).json({ success: false, message: 'Missing recipe ID.' });
    }
    
    fs.readFile(recipesFilePath, 'utf8', (readErr, data) => {
        if (readErr) {
            return res.status(500).json({ success: false, message: 'Error reading recipes file.' });
        }
        
        try {
            let recipes = JSON.parse(data);
            const initialLength = recipes.length;
            
            recipes = recipes.filter(recipe => recipe.idMeal !== idMeal);
            
            if (recipes.length === initialLength) {
                return res.status(404).json({ success: false, message: 'Recipe not found.' });
            }
            
            fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ success: false, message: 'Error updating recipes file.'});
                }
                
                return res.status(200).json({ success: true, message: 'Recipe deleted successfully.'});
            });
        } catch (parseErr) {
            return res.status(500).json({ success: false, message: 'Invalid JSON in recipes file.' });
        }
    });
};

module.exports = { createRecipe, deleteRecipe, getRecipes};