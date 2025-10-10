import express from 'express';
import { protect, restrictTo } from '../middleware/auth';
import { UserRole } from '../models/User';
import User from '../models/User';
const router = express.Router();
router.use(protect, restrictTo(UserRole.I4C_ADMIN));

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
