    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const cloudinary = require("cloudinary").v2;
    const { CloudinaryStorage } = require("multer-storage-cloudinary");

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Set up Cloudinary storage
    const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { 
        allowed_formats: ["jpg", "jpeg", "png"]
    },
    });

    const upload = multer({ storage: storage });

    // POST /api/upload
    router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    res.json({ 
        imageUrl: req.file.path, 
        publicId: req.file.filename 
    });
    });

    module.exports = router;