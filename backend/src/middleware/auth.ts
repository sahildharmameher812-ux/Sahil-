import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Check if running in demo mode
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI || mongoURI === 'skip') {
      // Demo mode - create user object without database
      if (decoded.id === 'demo-admin-001') {
        req.user = {
          _id: 'demo-admin-001',
          name: 'Demo Administrator',
          email: 'admin@cwri.gov.in',
          role: UserRole.I4C_ADMIN,
          isActive: true
        };
        return next();
      } else {
        return res.status(401).json({ message: 'Invalid demo user' });
      }
    }
    
    // Normal mode with database
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!req.user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};

export const checkReadOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === UserRole.AUDITOR && req.method !== 'GET') {
    return res.status(403).json({ 
      message: 'Auditors have read-only access' 
    });
  }
  next();
};
