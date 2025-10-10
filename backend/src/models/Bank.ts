import mongoose, { Document, Schema } from 'mongoose';

export interface IATM {
  atmId: string;
  location: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  isActive: boolean;
}

export interface IBank extends Document {
  bankName: string;
  ifscCode: string;
  branchName: string;
  location: {
    type: string;
    coordinates: [number, number];
    address: string;
    state: string;
    district: string;
    pincode: string;
  };
  contactPerson: {
    name: string;
    phone: string;
    email: string;
    designation: string;
  };
  atms: IATM[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BankSchema = new Schema<IBank>(
  {
    bankName: {
      type: String,
      required: true
    },
    ifscCode: {
      type: String,
      required: true,
      unique: true
    },
    branchName: {
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
      address: {
        type: String,
        required: true
      },
      state: String,
      district: String,
      pincode: String
    },
    contactPerson: {
      name: String,
      phone: String,
      email: String,
      designation: String
    },
    atms: [{
      atmId: {
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
        address: String
      },
      isActive: {
        type: Boolean,
        default: true
      }
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

BankSchema.index({ location: '2dsphere' });
BankSchema.index({ 'atms.location': '2dsphere' });
BankSchema.index({ ifscCode: 1 });

export default mongoose.model<IBank>('Bank', BankSchema);
