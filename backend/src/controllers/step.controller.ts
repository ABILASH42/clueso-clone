import { Request, Response } from 'express';
import Step from '../models/Step';
import Guide from '../models/Guide';

export const getGuideSteps = async (req: any, res: Response) => {
  const { guideId } = req.params;

  const guide = await Guide.findById(guideId);
  if (!guide) {
    res.status(404);
    throw new Error('Guide not found');
  }

  if (guide.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const steps = await Step.find({ guide: guideId }).sort({ orderIndex: 1 });
  res.json(steps);
};

export const addStep = async (req: any, res: Response) => {
  const { guideId } = req.params;
  const { title, description, orderIndex } = req.body;

  const guide = await Guide.findById(guideId);
  if (!guide) {
    res.status(404);
    throw new Error('Guide not found');
  }

  if (guide.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const stepCount = await Step.countDocuments({ guide: guideId });

  const step = await Step.create({
    guide: guideId,
    title,
    description,
    orderIndex: orderIndex !== undefined ? orderIndex : stepCount + 1,
    imageUrl: '',
  });

  res.status(201).json(step);
};

export const deleteStep = async (req: any, res: Response) => {
  const step = await Step.findById(req.params.id);

  if (!step) {
    res.status(404);
    throw new Error('Step not found');
  }

  const guide = await Guide.findById(step.guide);
  if (guide && guide.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await step.deleteOne();
  res.json({ message: 'Step removed' });
};
