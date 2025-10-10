import mongoose, { Document, Schema } from 'mongoose';

export interface ICase extends Document {
  caseId: string;
  title: string;
  description: string;
  status: 'open' | 'investigating' | 'fund_blocked' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  linkedComplaints: mongoose.Types.ObjectId[];
  linkedAlerts: mongoose.Types.ObjectId[];
  assignedTo: mongoose.Types.ObjectId[];
  leadInvestigator: mongoose.Types.ObjectId;
  timeline: Array<{
    event: string;
    description: string;
    performedBy: mongoose.Types.ObjectId;
    timestamp: Date;
    metadata?: any;
  }>;
  evidence: Array<{
    type: 'document' | 'image' | 'video' | 'audio' | 'link' | 'note';
    title: string;
    description?: string;
    url?: string;
    uploadedBy: mongoose.Types.ObjectId;
    uploadedAt: Date;
  }>;
  suspects: Array<{
    name?: string;
    phone?: string;
    upi?: string;
    accountNumber?: string;
    bankName?: string;
    notes?: string;
  }>;
  fundBlockRequests: Array<{
    bankName: string;
    accountNumber: string;
    amount: number;
    requestedAt: Date;
    requestedBy: mongoose.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    responseAt?: Date;
    notes?: string;
  }>;
  notifications: Array<{
    recipientType: 'bank' | 'lea' | 'team';
    recipientId?: string;
    message: string;
    sentAt: Date;
    sentBy: mongoose.Types.ObjectId;
  }>;
  recoveredAmount: number;
  totalLossAmount: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

const CaseSchema = new Schema<ICase>(
  {
    caseId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['open', 'investigating', 'fund_blocked', 'resolved', 'closed'],
      default: 'open'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    linkedComplaints: [{
      type: Schema.Types.ObjectId,
      ref: 'Complaint'
    }],
    linkedAlerts: [{
      type: Schema.Types.ObjectId,
      ref: 'Alert'
    }],
    assignedTo: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    leadInvestigator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    timeline: [{
      event: String,
      description: String,
      performedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
      metadata: Schema.Types.Mixed
    }],
    evidence: [{
      type: {
        type: String,
        enum: ['document', 'image', 'video', 'audio', 'link', 'note']
      },
      title: String,
      description: String,
      url: String,
      uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    suspects: [{
      name: String,
      phone: String,
      upi: String,
      accountNumber: String,
      bankName: String,
      notes: String
    }],
    fundBlockRequests: [{
      bankName: String,
      accountNumber: String,
      amount: Number,
      requestedAt: {
        type: Date,
        default: Date.now
      },
      requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
      },
      responseAt: Date,
      notes: String
    }],
    notifications: [{
      recipientType: {
        type: String,
        enum: ['bank', 'lea', 'team']
      },
      recipientId: String,
      message: String,
      sentAt: {
        type: Date,
        default: Date.now
      },
      sentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    recoveredAmount: {
      type: Number,
      default: 0
    },
    totalLossAmount: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    closedAt: Date
  },
  {
    timestamps: true
  }
);

CaseSchema.index({ caseId: 1 });
CaseSchema.index({ status: 1 });
CaseSchema.index({ createdAt: -1 });

export default mongoose.model<ICase>('Case', CaseSchema);
