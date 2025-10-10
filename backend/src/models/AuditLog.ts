import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  userRole: string;
  action: string;
  module: string;
  resourceType?: string;
  resourceId?: string;
  method?: string;
  endpoint?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: any;
  status: 'success' | 'failure';
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    module: {
      type: String,
      required: true
    },
    resourceType: String,
    resourceId: String,
    method: String,
    endpoint: String,
    ipAddress: String,
    userAgent: String,
    details: Schema.Types.Mixed,
    status: {
      type: String,
      enum: ['success', 'failure'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

AuditLogSchema.index({ userId: 1 });
AuditLogSchema.index({ module: 1 });
AuditLogSchema.index({ timestamp: -1 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
