import express from 'express';
import { router as videoGenerationRouter } from './videoGenerationRouter';

const router = express.Router();

router.use('/videogeneration', videoGenerationRouter);

module.exports = router;