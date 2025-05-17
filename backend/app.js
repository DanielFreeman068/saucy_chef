require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { connectDB } = require('./db/connect.js');
const port = 4000

// Middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())


//Body Parser
app.use(express.urlencoded({extended : false}));


//Routes
app.use('/api/login', require('./routes/userRoutes'));
app.use('/api/signup', require('./routes/userRoutes'));



const initServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        if (!process.env.MONGO_URI) {
            throw new Error("Missing MONGO_URI in .env file");
        } 
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (err) {
        console.error('Server init failed:', err.message);
    }
};

initServer();