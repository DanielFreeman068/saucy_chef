const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '2d' });
};



// Register user
const registerUser = async (req, res) => {
    const { email, password, favs = [] } = req.body;

    if (!email || !password || favs === undefined) {
        res.status(400);
        throw new Error("Please provide email, password");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hashedPassword,
        favs: [],
        mealPlan: {},
    });

    if (user) {
        res.status(201).json({
        success: true,
        user: {
            id: user._id,
            email: user.email,
            favs: user.favs,
            mealPlan: user.mealPlan,
        },
        token: generateToken(user._id, user.email),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
};

//get all users for admin page
const getAllUsers = async (req, res) => {
    const { adminPassword } = req.body;

    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ success: false, message: 'Access denied. Invalid admin password.' });
    }

    const users = await User.find().select('-password');

    res.json({
        success: true,
        users,
    });
};

//delete user from admin page
const deleteUser = async (req, res) => {
    const { adminPassword, userId } = req.body;

    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ success: false, message: 'Access denied. Invalid admin password.' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${userId} not found.`
            });
        }
        
        res.json({
            success: true,
            message: `User with ID ${userId} has been deleted.`,
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the user.',
            error: error.message
        });
    }
};


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        success: true,
        user: {
            id: user._id,
            email: user.email,
            favs: user.favs,
            mealPlan: user.mealPlan,
        },
        token: generateToken(user._id, user.email),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
};

// Get meal plan
const getMealPlan = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ mealPlan: user.mealPlan });
};

// Update meal plan
const updateMealPlan = async (req, res) => {
    const userId = req.user.id;
    const newMealPlan = req.body.mealPlan;

    if (!newMealPlan || typeof newMealPlan !== 'object') {
        return res.status(400).json({ error: 'Invalid mealPlan data' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.mealPlan = newMealPlan; // replace completely

    await user.save();

    res.json({ success: true, mealPlan: user.mealPlan });
};



// Clear entire meal plan
const clearMealPlan = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.mealPlan = {};
    await user.save();

    res.json({ success: true, mealPlan: {} });
};

// POST /favorites
const addToFavorites = async (req, res) => {
    const userId = req.user.id;
    const { mealId } = req.body;

    if (!mealId) return res.status(400).json({ message: 'mealId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.favs.includes(mealId)) {
        user.favs.push(mealId);
    } else {
        user.favs = user.favs.filter(id => id !== mealId);
    }

    await user.save();

    res.status(200).json({ success: true, favs: user.favs });
};


// GET /favorites
const getFavorites = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, favs: user.favs });
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser,
    getMealPlan,
    updateMealPlan,
    clearMealPlan,
    addToFavorites,
    getFavorites
};
