const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/reset_controller');

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
