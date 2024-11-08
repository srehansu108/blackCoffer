import express from 'express';
import { getData } from '../Controller/authController.js';

const router = express.Router();

router.get('/data', getData);

export default router;
