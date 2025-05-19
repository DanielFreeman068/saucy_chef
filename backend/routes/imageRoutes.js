const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

module.exports = router;