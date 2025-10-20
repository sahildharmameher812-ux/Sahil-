import express from 'express';
import { protect } from '../middleware/auth';
import Complaint from '../models/Complaint';
import Alert from '../models/Alert';
import Case from '../models/Case';
import { AuthRequest } from '../middleware/auth';
import { isDemoMode, demoDashboardData } from '../services/demoData';

const router = express.Router();

router.use(protect);

// Get dashboard statistics
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    // Check if in demo mode
    if (isDemoMode()) {
      return res.json({
        todayComplaints: 234,
        activeAlerts: 47,
        activeCases: 156,
        predictedHotspots: 8,
        fundBlockRequests: 3,
        lastSyncTime: new Date()
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayComplaints = await Complaint.countDocuments({ createdAt: { $gte: today } });
    const activeAlerts = await Alert.countDocuments({ status: { $in: ['active', 'acknowledged'] } });
    const activeCases = await Case.countDocuments({ status: { $nin: ['closed'] } });
    
    // Predicted hotspots for next 24 hours
    const next24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const predictedHotspots = await Alert.countDocuments({
      type: 'hotspot',
      'predictionWindow.startTime': { $lte: next24Hours },
      'predictionWindow.endTime': { $gte: new Date() },
      status: { $ne: 'resolved' }
    });

    // Fund block requests
    const fundBlockRequests = await Case.aggregate([
      { $unwind: '$fundBlockRequests' },
      { $match: { 'fundBlockRequests.status': 'pending' } },
      { $count: 'total' }
    ]);

    res.json({
      todayComplaints,
      activeAlerts,
      activeCases,
      predictedHotspots,
      fundBlockRequests: fundBlockRequests[0]?.total || 0,
      lastSyncTime: new Date()
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get today's alerts preview
router.get('/alerts/preview', async (req, res) => {
  try {
    const alerts = await Alert.find({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } })
      .limit(10)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name');
    res.json(alerts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get recent activity
router.get('/activity', async (req, res) => {
  try {
    const recentCases = await Case.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('caseId title status updatedAt')
      .populate('leadInvestigator', 'name');

    const recentAlerts = await Alert.find({ status: 'acknowledged' })
      .sort({ acknowledgedAt: -1 })
      .limit(5)
      .select('alertId title acknowledgedAt')
      .populate('acknowledgedBy', 'name');

    const activity = [
      ...recentCases.map(c => ({ type: 'case', data: c })),
      ...recentAlerts.map(a => ({ type: 'alert', data: a }))
    ].sort((a, b) => {
      const dateA = a.type === 'case' ? (a.data as any).updatedAt : (a.data as any).acknowledgedAt;
      const dateB = b.type === 'case' ? (b.data as any).updatedAt : (b.data as any).acknowledgedAt;
      return dateB - dateA;
    }).slice(0, 10);

    res.json(activity);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
