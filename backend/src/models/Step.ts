import mongoose, { Document } from 'mongoose';

export interface IStep extends Document {
  guide: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  orderIndex: number;
  imageUrl?: string;
  createdAt: Date;
}

const stepSchema = new mongoose.Schema<IStep>({
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Guide',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  orderIndex: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Step = mongoose.model<IStep>('Step', stepSchema);

export default Step;
