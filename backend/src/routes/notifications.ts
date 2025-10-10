import express from 'express';
import { protect } from '../middleware/auth';
const router = express.Router();
router.use(protect);
router.get('/', async (req, res) => res.json({ message: 'Notifications list' }));
router.post('/send', async (req, res) => res.json({ message: 'Notification sent' }));
export default router;
