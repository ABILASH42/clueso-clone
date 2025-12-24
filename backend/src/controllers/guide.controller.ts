import { Request, Response } from 'express';
import Guide from '../models/Guide';
import Step from '../models/Step';
import { generateGuideSummary } from '../services/ai.service';

export const getGuides = async (req: any, res: Response) => {
  const guides = await Guide.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(guides);
};

export const createGuide = async (req: any, res: Response) => {
  const { title, description, audience } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Guide title is required');
  }

  const guide = new Guide({
    user: req.user._id,
    title,
    description,
    audience,
    status: 'DRAFT',
  });

  const createdGuide = await guide.save();
  res.status(201).json(createdGuide);
};

export const getGuideById = async (req: any, res: Response) => {
  const guide = await Guide.findById(req.params.id);

  if (guide) {
    if (guide.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this guide');
    }
    res.json(guide);
  } else {
    res.status(404);
    throw new Error('Guide not found');
  }
};

export const deleteGuide = async (req: any, res: Response) => {
  const guide = await Guide.findById(req.params.id);

  if (guide) {
    if (guide.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this guide');
    }
    await guide.deleteOne();
    await Step.deleteMany({ guide: req.params.id });
    
    res.json({ message: 'Guide removed' });
  } else {
    res.status(404);
    throw new Error('Guide not found');
  }
};

export const generateSummary = async (req: any, res: Response) => {
  const guide = await Guide.findById(req.params.id);

  if (!guide) {
    res.status(404);
    throw new Error('Guide not found');
  }

  if (guide.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const steps = await Step.find({ guide: req.params.id }).sort({ orderIndex: 1 });
  const summary = await generateGuideSummary(guide._id.toString(), steps);

  guide.description = summary;
  guide.status = 'GENERATED';
  await guide.save();

  res.json({
    summary,
    guide,
  });
};
