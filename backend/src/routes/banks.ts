import express from 'express';
import { protect } from '../middleware/auth';
import Bank from '../models/Bank';
const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  try {
    const { state, district, page = 1, limit = 50 } = req.query;
    const query: any = {};
    if (state) query['location.state'] = state;
    if (district) query['location.district'] = district;
    const banks = await Bank.find(query).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
    const total = await Bank.countDocuments(query);
    res.json({ banks, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const bank = await Bank.create(req.body);
    res.status(201).json(bank);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
