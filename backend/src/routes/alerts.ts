import express from 'express';
import { protect, checkReadOnly } from '../middleware/auth';
import Alert from '../models/Alert';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();
router.use(protect, checkReadOnly);

// Get all alerts with filters
router.get('/', async (req, res) => {
  try {
    const { status, type, severity, state, district, page = 1, limit = 50 } = req.query;
    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (severity) query.severity = severity;
    if (state) query['location.state'] = state;
    if (district) query['location.district'] = district;

    const alerts = await Alert.find(query)
      .populate('assignedTo acknowledgedBy resolvedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Alert.countDocuments(query);
    res.json({ alerts, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get single alert
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id).populate('linkedComplaints assignedTo');
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Acknowledge alert
router.post('/:id/acknowledge', async (req: AuthRequest, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: 'acknowledged',
        acknowledgedBy: req.user._id,
        acknowledgedAt: new Date(),
        $push: { actions: { action: 'acknowledged', performedBy: req.user._id, notes: req.body.notes } }
      },
      { new: true }
    );
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Assign alert
router.post('/:id/assign', async (req: AuthRequest, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: req.body.userId,
        $push: { actions: { action: 'assigned', performedBy: req.user._id, notes: req.body.notes } }
      },
      { new: true }
    );
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Resolve alert
router.post('/:id/resolve', async (req: AuthRequest, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: 'resolved',
        resolvedBy: req.user._id,
        resolvedAt: new Date(),
        $push: { actions: { action: 'resolved', performedBy: req.user._id, notes: req.body.notes } }
      },
      { new: true }
    );
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
