import { Router } from 'express';
import authRouter from './auth.route';
import ResponseFormat from '@utils/response-format';
import errorsHandler from '@middlewares/errors-handler.middleware';

const router = Router();

router.use('/auth', authRouter);

router.use('*', (req, res) => {
	res
		.status(404)
		.send(ResponseFormat.error(404, 'The endpoint does not exist', {}));
});

router.use(errorsHandler);

export default router;
