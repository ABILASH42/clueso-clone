import express from 'express';
import {
  getGuideSteps,
  addStep,
  deleteStep,
} from '../controllers/step.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(protect, getGuideSteps)
  .post(protect, addStep);

router.route('/:id')
  .delete(protect, deleteStep);

export default router;
