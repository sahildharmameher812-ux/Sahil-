// Demo data service for running without MongoDB
export const isDemoMode = () => {
  const mongoURI = process.env.MONGODB_URI;
  return !mongoURI || mongoURI === 'skip';
};

export const demoUser = {
  _id: 'demo-admin-001',
  name: 'Demo Administrator',
  email: 'admin@cwri.gov.in',
  role: 'I4C_ADMIN',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const demoDashboardData = {
  overview: {
    totalComplaints: 15234,
    resolvedCases: 12876,
    activeAlerts: 47,
    riskScore: 78.5
  },
  recentActivity: [
    { id: 1, type: 'alert', message: 'High risk transaction detected in Mumbai', timestamp: new Date() },
    { id: 2, type: 'case', message: 'Case #2341 resolved successfully', timestamp: new Date() },
    { id: 3, type: 'complaint', message: 'New complaint registered from Delhi', timestamp: new Date() }
  ],
  statistics: {
    daily: { complaints: 234, resolved: 198, pending: 36 },
    weekly: { complaints: 1638, resolved: 1386, pending: 252 },
    monthly: { complaints: 7024, resolved: 5947, pending: 1077 }
  }
};

export const demoComplaints = [
  { id: 1, title: 'Suspicious ATM withdrawal', status: 'pending', location: 'Mumbai', amount: 50000 },
  { id: 2, title: 'Fraudulent transaction', status: 'resolved', location: 'Delhi', amount: 25000 },
  { id: 3, title: 'Identity theft case', status: 'investigating', location: 'Bangalore', amount: 100000 }
];

export const demoAlerts = [
  { id: 1, severity: 'high', message: 'Multiple failed login attempts detected', location: 'Chennai' },
  { id: 2, severity: 'medium', message: 'Unusual withdrawal pattern observed', location: 'Kolkata' },
  { id: 3, severity: 'low', message: 'New device login detected', location: 'Pune' }
];