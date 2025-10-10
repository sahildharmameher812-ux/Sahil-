import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  complaintId: string;
  victimName: string;
  victimPhone: string;
  victimEmail?: string;
  fraudType: string;
  fraudAmount: number;
  fraudDate: Date;
  reportedDate: Date;
  description: string;
  suspectPhone?: string;
  suspectUPI?: string;
  suspectAccountNumber?: string;
  suspectBankName?: string;
  suspectIFSC?: string;
  location: {
    type: string;
    coordinates: [number, number];
    address?: string;
    state?: string;
    district?: string;
    pincode?: string;
  };
  riskScore: number;
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  linkedCaseId?: mongoose.Types.ObjectId;
  enrichmentData?: any;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true
    },
    victimName: {
      type: String,
      required: true
    },
    victimPhone: {
      type: String,
      required: true
    },
    victimEmail: String,
    fraudType: {
      type: String,
      required: true,
      enum: ['UPI Fraud', 'ATM Fraud', 'Online Banking', 'Card Cloning', 'Phishing', 'Investment Scam', 'Other']
    },
    fraudAmount: {
      type: Number,
      required: true
    },
    fraudDate: {
      type: Date,
      required: true
    },
    reportedDate: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      required: true
    },
    suspectPhone: String,
    suspectUPI: String,
    suspectAccountNumber: String,
    suspectBankName: String,
    suspectIFSC: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      },
      address: String,
      state: String,
      district: String,
      pincode: String
    },
    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['pending', 'investigating', 'resolved', 'closed'],
      default: 'pending'
    },
    linkedCaseId: {
      type: Schema.Types.ObjectId,
      ref: 'Case'
    },
    enrichmentData: {
      type: Schema.Types.Mixed
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

ComplaintSchema.index({ location: '2dsphere' });
ComplaintSchema.index({ complaintId: 1 });
ComplaintSchema.index({ suspectPhone: 1 });
ComplaintSchema.index({ suspectUPI: 1 });
ComplaintSchema.index({ createdAt: -1 });

export default mongoose.model<IComplaint>('Complaint', ComplaintSchema);
