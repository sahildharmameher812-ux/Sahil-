import mongoose, { Document, Schema } from 'mongoose';

export interface IAlert extends Document {
  alertId: string;
  type: 'hotspot' | 'sla_breach' | 'high_risk' | 'pattern_match' | 'geofence';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
    address?: string;
    state?: string;
    district?: string;
    radius?: number;
  };
  predictionWindow: {
    startTime: Date;
    endTime: Date;
  };
  riskScore: number;
  confidence: number;
  linkedComplaints: mongoose.Types.ObjectId[];
  relatedATMs?: string[];
  targetBanks?: string[];
  status: 'active' | 'acknowledged' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: mongoose.Types.ObjectId;
  acknowledgedAt?: Date;
  acknowledgedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  resolvedBy?: mongoose.Types.ObjectId;
  slaDeadline?: Date;
  actions: Array<{
    action: string;
    performedBy: mongoose.Types.ObjectId;
    performedAt: Date;
    notes?: string;
  }>;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const AlertSchema = new Schema<IAlert>(
  {
    alertId: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      enum: ['hotspot', 'sla_breach', 'high_risk', 'pattern_match', 'geofence'],
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
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
      radius: Number
    },
    predictionWindow: {
      startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      }
    },
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    linkedComplaints: [{
      type: Schema.Types.ObjectId,
      ref: 'Complaint'
    }],
    relatedATMs: [String],
    targetBanks: [String],
    status: {
      type: String,
      enum: ['active', 'acknowledged', 'investigating', 'resolved', 'false_positive'],
      default: 'active'
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    acknowledgedAt: Date,
    acknowledgedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date,
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    slaDeadline: Date,
    actions: [{
      action: String,
      performedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      performedAt: {
        type: Date,
        default: Date.now
      },
      notes: String
    }],
    metadata: Schema.Types.Mixed
  },
  {
    timestamps: true
  }
);

AlertSchema.index({ location: '2dsphere' });
AlertSchema.index({ alertId: 1 });
AlertSchema.index({ status: 1 });
AlertSchema.index({ createdAt: -1 });

export default mongoose.model<IAlert>('Alert', AlertSchema);
