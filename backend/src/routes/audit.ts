import express from 'express';
import { protect } from '../middleware/auth';
import AuditLog from '../models/AuditLog';
const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  try {
    const { module, userId, startDate, endDate, page = 1, limit = 50 } = req.query;
    const query: any = {};
    if (module) query.module = module;
    if (userId) query.userId = userId;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate as string);
      if (endDate) query.timestamp.$lte = new Date(endDate as string);
    }
    const logs = await AuditLog.find(query).populate('userId', 'name email').sort({ timestamp: -1 }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
    const total = await AuditLog.countDocuments(query);
    res.json({ logs, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
