import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import { protect, checkReadOnly } from '../middleware/auth';
import Complaint from '../models/Complaint';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(protect, checkReadOnly);

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const { status, fraudType, state, district, startDate, endDate, page = 1, limit = 50 } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (fraudType) query.fraudType = fraudType;
    if (state) query['location.state'] = state;
    if (district) query['location.district'] = district;
    if (startDate || endDate) {
      query.fraudDate = {};
      if (startDate) query.fraudDate.$gte = new Date(startDate as string);
      if (endDate) query.fraudDate.$lte = new Date(endDate as string);
    }

    const complaints = await Complaint.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Complaint.countDocuments(query);
    res.json({ complaints, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get single complaint
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('linkedCaseId', 'caseId title status');
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create complaint
router.post('/', async (req: AuthRequest, res) => {
  try {
    const complaintId = `CWRI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const complaintData = { ...req.body, complaintId, createdBy: req.user._id };
    const complaint = await Complaint.create(complaintData);
    res.status(201).json(complaint);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Update complaint
router.put('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Import complaints from CSV
router.post('/import', upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const complaints: any[] = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (row) => {
        const complaintId = `CWRI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        complaints.push({
          complaintId,
          victimName: row.victimName,
          victimPhone: row.victimPhone,
          fraudType: row.fraudType,
          fraudAmount: parseFloat(row.fraudAmount),
          fraudDate: new Date(row.fraudDate),
          description: row.description,
          location: {
            type: 'Point',
            coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)],
            address: row.address,
            state: row.state,
            district: row.district
          },
          createdBy: req.user._id
        });
      })
      .on('end', async () => {
        const result = await Complaint.insertMany(complaints);
        fs.unlinkSync(req.file!.path);
        res.json({ message: `${result.length} complaints imported successfully`, count: result.length });
      });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
