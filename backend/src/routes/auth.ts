import express from 'express';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import User, { UserRole } from '../models/User';
import { AuthRequest, protect } from '../middleware/auth';

const router = express.Router();

// Bootstrap - Create first admin (only works if no users exist)
router.post('/bootstrap', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(403).json({ message: 'Bootstrap only available when no users exist' });
    }

    const { name, email, password } = req.body;
    const user = await User.create({
      name: name || 'System Administrator',
      email: email || 'admin@cwri.gov.in',
      password: password || 'Admin@123',
      role: UserRole.I4C_ADMIN,
      isActive: true
    });

    res.status(201).json({
      message: 'Admin user created successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Register (Admin creates users)
router.post('/register', protect, async (req: AuthRequest, res) => {
  try {
    const { name, email, password, role, phone, region, state, district, bankName } = req.body;

    if (!req.user || req.user.role !== UserRole.I4C_ADMIN) {
      return res.status(403).json({ message: 'Only I4C Admin can create users' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role, phone, region, state, district, bankName });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if running in demo mode (no MongoDB)
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI || mongoURI === 'skip') {
      // Demo mode - accept specific credentials without database
      if (email === 'admin@cwri.gov.in' && password === 'Admin@123') {
        const demoUser = {
          _id: 'demo-admin-001',
          name: 'Demo Administrator',
          email: 'admin@cwri.gov.in',
          role: UserRole.I4C_ADMIN
        };
        
        const token = jwt.sign(
          { id: demoUser._id, role: demoUser.role },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
        );
        
        const refreshToken = jwt.sign(
          { id: demoUser._id, role: demoUser.role, type: 'refresh' },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '30d' } as jwt.SignOptions
        );
        
        return res.json({ 
          token, 
          refreshToken,
          user: demoUser
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }
    
    // Normal mode with database
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If 2FA enabled, require TOTP
    if (user.twoFactorEnabled) {
      return res.json({ require2FA: true, userId: user._id });
    }

    // Generate both access and refresh tokens
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
    );
    
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role, type: 'refresh' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' } as jwt.SignOptions
    );
    
    user.lastLogin = new Date();
    await user.save();
    res.json({ 
      token, 
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Verify 2FA and issue token
router.post('/2fa/verify', async (req, res) => {
  try {
    const { userId, token } = req.body;
    const user = await User.findById(userId).select('+twoFactorSecret');
    if (!user || !user.twoFactorSecret) return res.status(400).json({ message: 'Invalid user or 2FA not enabled' });

    const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token });
    if (!verified) return res.status(400).json({ message: 'Invalid 2FA token' });

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
    );
    user.lastLogin = new Date();
    await user.save();
    res.json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Enable 2FA (Admins only for their accounts; I4C can enforce)
router.post('/2fa/setup', protect, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user._id).select('+twoFactorSecret');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const secret = speakeasy.generateSecret({ name: `CWRI (${user.email})` });
    user.twoFactorSecret = secret.base32;
    await user.save();

    const otpauthUrl = secret.otpauth_url || '';
    const qr = await QRCode.toDataURL(otpauthUrl);
    res.json({ otpauthUrl, qr });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Confirm 2FA
router.post('/2fa/confirm', protect, async (req: AuthRequest, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user._id).select('+twoFactorSecret');
    if (!user || !user.twoFactorSecret) return res.status(400).json({ message: '2FA is not set up' });

    const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token });
    if (!verified) return res.status(400).json({ message: 'Invalid 2FA token' });

    user.twoFactorEnabled = true;
    await user.save();
    res.json({ message: '2FA enabled successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Verify token endpoint
router.post('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Check if running in demo mode
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI || mongoURI === 'skip') {
      // Demo mode - validate token without database
      if (decoded.id === 'demo-admin-001') {
        return res.json({ 
          valid: true, 
          user: { 
            id: 'demo-admin-001',
            name: 'Demo Administrator',
            email: 'admin@cwri.gov.in',
            role: UserRole.I4C_ADMIN
          } 
        });
      } else {
        return res.status(401).json({ valid: false, message: 'Invalid demo user' });
      }
    }
    
    // Normal mode with database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ valid: false, message: 'Invalid user or account deactivated' });
    }

    res.json({ 
      valid: true, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ valid: false, message: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }
    res.status(500).json({ valid: false, message: err.message });
  }
});

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET || 'secret');
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid user or account deactivated' });
    }

    // Generate new access token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
    );

    res.json({ 
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    res.status(500).json({ message: err.message });
  }
});

export default router;
