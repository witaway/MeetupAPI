import { Router } from 'express';

const router = Router();

router.get('*', (req, res) => {
	res.status(404);
	res.send('This page does not exist');
});

export default router;
