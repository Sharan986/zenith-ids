import express from 'express';
import { onboarding, getProfile } from '../controllers/profile.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/onboarding', authenticateToken, onboarding);
router.get('/me', authenticateToken, getProfile);

export default router;
