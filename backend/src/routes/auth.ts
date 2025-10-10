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
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If 2FA enabled, require TOTP
    if (user.twoFactorEnabled) {
      return res.json({ require2FA: true, userId: user._id });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
    );
    user.lastLogin = new Date();
    await user.save();
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
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

export default router;
