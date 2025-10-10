import express from 'express';
import { protect } from '../middleware/auth';
const router = express.Router();
router.use(protect);
router.get('/', async (req, res) => res.json({ message: 'Intelligence reports list' }));
router.post('/', async (req, res) => res.json({ message: 'Create intelligence report' }));
export default router;
