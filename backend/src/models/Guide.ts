import mongoose, { Document } from 'mongoose';

export interface IGuide extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string; // Goal of the guide via implementation plan
  audience?: string;
  status: 'DRAFT' | 'GENERATED';
  createdAt: Date;
  updatedAt: Date;
}

const guideSchema = new mongoose.Schema<IGuide>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  audience: {
    type: String,
  },
  status: {
    type: String,
    enum: ['DRAFT', 'GENERATED'],
    default: 'DRAFT',
  },
}, {
  timestamps: true,
});

const Guide = mongoose.model<IGuide>('Guide', guideSchema);

export default Guide;
