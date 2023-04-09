import { Router } from 'express';
import authRouter from './auth.route';
import errorsHandler from '@middlewares/errors-handler.middleware';
import authenticate from '@middlewares/authenticate.middleware';
import notFoundHandler from '@middlewares/not-found-handler.middleware';
import meetupsRouter from './meetups.route';

const router = Router();

router.use('/auth', authRouter);
router.use(authenticate);
router.use('/meetups', meetupsRouter);

router.use('*', notFoundHandler);
router.use(errorsHandler);

export default router;
