import { Router } from 'express';
import authRouter from './auth.route';

const router = Router();

router.use('/auth', authRouter);

router.get('*', (req, res) => {
	res.status(404);
	res.send('This page does not exist');
});

export default router;
