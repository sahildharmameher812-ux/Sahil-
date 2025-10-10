import express from 'express';
import { protect } from '../middleware/auth';
const router = express.Router();
router.use(protect);
router.get('/sla', async (req, res) => res.json({ message: 'SLA report' }));
router.get('/recovery', async (req, res) => res.json({ message: 'Recovery rate report' }));
router.get('/accuracy', async (req, res) => res.json({ message: 'Alert accuracy report' }));
export default router;
