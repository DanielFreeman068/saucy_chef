const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Must provide Email'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Must provide Password'],
        trim: true,
    },
    favs: {
        type: [String],  
        default: []   
    },
    mealPlan: {
        type: Object,
        default: {},
    },
    resetCode: String,
    resetCodeExpires: Date,

}, {collection: 'users'})

module.exports = mongoose.model('User', UserSchema);