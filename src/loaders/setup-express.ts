// This module solves problem with unhandled promise rejection
// https://stackoverflow.com/questions/55504066/how-to-gracefully-handle-promise-rejection-in-express
import 'express-async-errors';

import { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

const setupExpress = (server: Express) => {
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));
	server.use(cookieParser(process.env['COOKIE_SECRET']));
	server.use(passport.initialize());
};

export default setupExpress;
