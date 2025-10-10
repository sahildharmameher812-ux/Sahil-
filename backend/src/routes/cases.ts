import express from 'express';
import { protect, checkReadOnly } from '../middleware/auth';
import Case from '../models/Case';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();
router.use(protect, checkReadOnly);

router.get('/', async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 50 } = req.query;
    const query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    const cases = await Case.find(query).populate('leadInvestigator assignedTo').sort({ createdAt: -1 }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
    const total = await Case.countDocuments(query);
    res.json({ cases, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id).populate('leadInvestigator assignedTo linkedComplaints linkedAlerts');
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json(caseData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const caseId = `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const caseData = await Case.create({ ...req.body, caseId, createdBy: req.user._id });
    res.status(201).json(caseData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const caseData = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json(caseData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/evidence', async (req: AuthRequest, res) => {
  try {
    const caseData = await Case.findByIdAndUpdate(req.params.id, { $push: { evidence: { ...req.body, uploadedBy: req.user._id } } }, { new: true });
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json(caseData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/fund-block', async (req: AuthRequest, res) => {
  try {
    const caseData = await Case.findByIdAndUpdate(req.params.id, { $push: { fundBlockRequests: { ...req.body, requestedBy: req.user._id } } }, { new: true });
    if (!caseData) return res.status(404).json({ message: 'Case not found' });
    res.json(caseData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
