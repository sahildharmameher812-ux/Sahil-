import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  I4C_ADMIN = 'I4C_ADMIN',
  STATE_LEA = 'STATE_LEA',
  DISTRICT_OFFICER = 'DISTRICT_OFFICER',
  BANK_OFFICER = 'BANK_OFFICER',
  ANALYST = 'ANALYST',
  AUDITOR = 'AUDITOR'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  region?: string;
  state?: string;
  district?: string;
  bankName?: string;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.ANALYST
    },
    phone: {
      type: String,
      trim: true
    },
    region: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    district: {
      type: String,
      trim: true
    },
    bankName: {
      type: String,
      trim: true
    },
    twoFactorSecret: {
      type: String,
      select: false
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
