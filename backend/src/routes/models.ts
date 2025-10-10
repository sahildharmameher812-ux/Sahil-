import express from 'express';
import { protect, restrictTo } from '../middleware/auth';
import { UserRole } from '../models/User';
const router = express.Router();
router.use(protect, restrictTo(UserRole.I4C_ADMIN, UserRole.ANALYST));
router.get('/', async (req, res) => res.json({ message: 'ML models list' }));
router.post('/train', async (req, res) => res.json({ message: 'Train new model' }));
export default router;
