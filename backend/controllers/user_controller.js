    const User = require('../models/User');
    const asyncWrapper = require('../middleware/async');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    // Function to generate a JWT token for a user
    const generateToken = (id, email) => {
    return jwt.sign({  id, email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    };

    // @desc    Register a new user
    // @route   POST /api/signup/register
    // @access  Public
    const registerUser = async (req, res) => {
            const { email, password, favs = [] } = req.body;

            // Ensure all required fields are provided
            if ( !email || !password || favs === undefined) {
                res.status(400);
                throw new Error("Please provide email, password");
            }

            // Check if the user already exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                res.status(400);
                throw new Error("User already exists");
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create the new user
            const user = await User.create({
                email,
                password: hashedPassword,
                favs: [],
            });

            if (user) {
                res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    favs: user.favs,
                },
                token: generateToken(user._id, user.email),
                });
            } else {
                res.status(400);
                throw new Error("Invalid user data");
            }
    };

    // @desc    Authenticate a user and get token
    // @access  Public
    const loginUser = async (req, res) => {
            const { email, password } = req.body;

            // Ensure email and password are provided
            if (!email || !password) {
                res.status(400);
                throw new Error("Please provide email and password");
            }

            const user = await User.findOne({ email });

            // Check if user exists and if the provided password matches
            if (user && (await bcrypt.compare(password, user.password))) {
                res.json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    favs: user.favs,
                },
                token: generateToken(user._id, user.email),
                });
            } else {
                res.status(401);
                throw new Error("Invalid email or password");
            }
    };

    module.exports = { registerUser, loginUser };