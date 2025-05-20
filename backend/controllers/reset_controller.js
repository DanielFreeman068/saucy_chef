const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// In-memory store for reset codes (use Redis or DB in production)
const resetCodes = new Map();

// Helper: Generate a 6-digit code
const generateResetCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// SEND RESET CODE TO EMAIL
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = generateResetCode();
    resetCodes.set(email, { code, expiresAt: Date.now() + 15 * 60 * 1000 }); // 15 mins

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'Saucy Chef Support',
        to: email,
        subject: 'Your Password Reset Code',
        html: `<p>Your password reset code is:</p><h2>${code}</h2><p>This code expires in 15 minutes.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Reset code sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
};

// VERIFY THE 6-DIGIT CODE
exports.verifyResetCode = (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: 'Email and code required' });

    const record = resetCodes.get(email);
    if (!record) return res.status(400).json({ message: 'No code sent to this email' });

    if (record.code !== code) {
        return res.status(400).json({ message: 'Invalid code' });
    }

    if (Date.now() > record.expiresAt) {
        resetCodes.delete(email);
        return res.status(400).json({ message: 'Code expired' });
    }

    res.json({ message: 'Code verified' });
};

// RESET PASSWORD AFTER CODE VERIFICATION
exports.resetPassword = async (req, res) => {
    const { email, code, password } = req.body;
    if (!email || !code || !password) {
        return res.status(400).json({ message: 'Email, code, and new password required' });
    }

    const record = resetCodes.get(email);
    if (!record || record.code !== code) {
        return res.status(400).json({ message: 'Invalid or expired code' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        resetCodes.delete(email); // cleanup

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};
