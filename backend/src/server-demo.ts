import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory demo user
const demoUser = {
  id: '123456',
  name: 'Demo Admin',
  email: 'admin@cwri.gov.in',
  password: 'Admin@123',
  role: 'I4C_ADMIN',
  region: 'All India'
};

// Demo data
const demoStats = {
  todayComplaints: 42,
  predictedHotspots: 8,
  activeAlerts: 15,
  fundBlockRequests: 5,
  lastSyncTime: new Date()
};

const demoAlerts = [
  {
    _id: '1',
    alertId: 'ALT-2025-001',
    title: 'High Risk Zone Detected in Mumbai',
    severity: 'critical',
    location: { district: 'Mumbai', state: 'Maharashtra' },
    status: 'active',
    riskScore: 95
  },
  {
    _id: '2',
    alertId: 'ALT-2025-002',
    title: 'Suspicious ATM Activity in Delhi',
    severity: 'high',
    location: { district: 'New Delhi', state: 'Delhi' },
    status: 'acknowledged',
    riskScore: 87
  },
  {
    _id: '3',
    alertId: 'ALT-2025-003',
    title: 'Pattern Match - Multiple Withdrawals',
    severity: 'medium',
    location: { district: 'Bangalore', state: 'Karnataka' },
    status: 'active',
    riskScore: 72
  }
];

const demoActivity = [
  {
    type: 'case',
    data: {
      caseId: 'CASE-2025-101',
      title: 'UPI Fraud Investigation',
      status: 'investigating',
      updatedAt: new Date(Date.now() - 1000 * 60 * 30)
    }
  },
  {
    type: 'alert',
    data: {
      alertId: 'ALT-2025-002',
      title: 'Suspicious ATM Activity',
      acknowledgedAt: new Date(Date.now() - 1000 * 60 * 45)
    }
  },
  {
    type: 'case',
    data: {
      caseId: 'CASE-2025-099',
      title: 'Bank Account Takeover',
      status: 'resolved',
      updatedAt: new Date(Date.now() - 1000 * 60 * 120)
    }
  }
];

// Auth Routes
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('🔐 Login attempt:', { email, passwordLength: password?.length });
  
  if (email === demoUser.email && password === demoUser.password) {
    const token = jwt.sign(
      { id: demoUser.id, role: demoUser.role },
      'demo-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        region: demoUser.region
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Dashboard Routes
app.get('/api/dashboard/stats', (req: Request, res: Response) => {
  res.json(demoStats);
});

app.get('/api/dashboard/alerts/preview', (req: Request, res: Response) => {
  res.json(demoAlerts);
});

app.get('/api/dashboard/activity', (req: Request, res: Response) => {
  res.json(demoActivity);
});

// Complaints Routes
app.get('/api/complaints', (req: Request, res: Response) => {
  res.json({
    complaints: [
      {
        _id: '1',
        complaintId: 'CWRI-2025-001',
        victimName: 'Rajesh Kumar',
        fraudType: 'UPI Fraud',
        fraudAmount: 50000,
        status: 'investigating',
        location: { district: 'Mumbai', state: 'Maharashtra' }
      }
    ],
    total: 1,
    page: 1,
    totalPages: 1
  });
});

// Alerts Routes
app.get('/api/alerts', (req: Request, res: Response) => {
  res.json({
    alerts: demoAlerts,
    total: demoAlerts.length,
    page: 1,
    totalPages: 1
  });
});

// Cases Routes
app.get('/api/cases', (req: Request, res: Response) => {
  res.json({
    cases: [
      {
        _id: '1',
        caseId: 'CASE-2025-101',
        title: 'UPI Fraud Investigation',
        status: 'investigating',
        priority: 'high'
      }
    ],
    total: 1,
    page: 1,
    totalPages: 1
  });
});

// Banks Routes
app.get('/api/banks', (req: Request, res: Response) => {
  res.json({
    banks: [
      {
        _id: '1',
        bankName: 'State Bank of India',
        ifscCode: 'SBIN0001234',
        location: { district: 'Mumbai', state: 'Maharashtra' }
      }
    ],
    total: 1
  });
});

// Admin Routes
app.get('/api/admin/users', (req: Request, res: Response) => {
  res.json([demoUser]);
});

// Audit Routes
app.get('/api/audit', (req: Request, res: Response) => {
  res.json({
    logs: [
      {
        _id: '1',
        userEmail: 'admin@cwri.gov.in',
        action: 'login',
        module: 'auth',
        timestamp: new Date()
      }
    ],
    total: 1
  });
});

// Reports Routes
app.get('/api/reports/sla', (req: Request, res: Response) => {
  res.json({ message: 'SLA report data' });
});

// Intelligence Routes
app.get('/api/intelligence', (req: Request, res: Response) => {
  res.json({ message: 'Intelligence reports list' });
});

// Models Routes
app.get('/api/models', (req: Request, res: Response) => {
  res.json({ message: 'ML models list' });
});

// Notifications Routes
app.get('/api/notifications', (req: Request, res: Response) => {
  res.json({ message: 'Notifications list' });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK - DEMO MODE', timestamp: new Date() });
});

// Catch all for other routes
app.all('/api/*', (req: Request, res: Response) => {
  res.json({ message: 'Demo endpoint - feature available in full version' });
});

// Start Server
app.listen(PORT, () => {
  console.log('');
  console.log('🎉 ============================================');
  console.log('🚀 CWRI DEMO BACKEND IS RUNNING!');
  console.log('============================================');
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`📊 Status: http://localhost:${PORT}/health`);
  console.log('');
  console.log('🔐 DEMO LOGIN CREDENTIALS:');
  console.log('   Email: admin@cwri.gov.in');
  console.log('   Password: Admin@123');
  console.log('');
  console.log('⚠️  NOTE: This is DEMO mode (no database)');
  console.log('   Data will not persist after restart');
  console.log('============================================');
  console.log('');
});

export default app;
