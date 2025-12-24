import express from 'express';
import {
  getGuides,
  createGuide,
  getGuideById,
  deleteGuide,
  generateSummary,
} from '../controllers/guide.controller';
import { protect } from '../middleware/auth.middleware';

import stepRoutes from './step.routes';

const router = express.Router();

// Mount step routes
router.use('/:guideId/steps', stepRoutes);

router.route('/')
  .get(protect, getGuides)
  .post(protect, createGuide);

router.route('/:id')
  .get(protect, getGuideById)
  .delete(protect, deleteGuide);

router.route('/:id/generate-summary')
  .post(protect, generateSummary);

export default router;
