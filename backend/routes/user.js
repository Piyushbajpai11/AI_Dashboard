import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

// GET user profile & stats
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE user profile info
router.put('/profile', authMiddleware, async (req, res) => {
    const { name, bio, profileImageUrl } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (profileImageUrl !== undefined) user.profileImageUrl = profileImageUrl;

        await user.save();
        res.json({ message: 'Profile updated', user });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

// module.exports = router;
