// This module solves problem with unhandled promise rejection
// https://stackoverflow.com/questions/55504066/how-to-gracefully-handle-promise-rejection-in-express
import 'express-async-errors';

import { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import env from '@config/env';

const setupExpress = (app: Express) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser(env.COOKIE_SECRET));
	app.use(passport.initialize());
};

export default setupExpress;
