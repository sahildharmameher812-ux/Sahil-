import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Routes
import authRoutes from './routes/auth';
import complaintRoutes from './routes/complaints';
import alertRoutes from './routes/alerts';
import caseRoutes from './routes/cases';
import intelligenceRoutes from './routes/intelligence';
import modelRoutes from './routes/models';
import bankRoutes from './routes/banks';
import reportRoutes from './routes/reports';
import adminRoutes from './routes/admin';
import auditRoutes from './routes/audit';
import dashboardRoutes from './routes/dashboard';
import notificationRoutes from './routes/notifications';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
app.use('/api/', rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/intelligence', intelligenceRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
