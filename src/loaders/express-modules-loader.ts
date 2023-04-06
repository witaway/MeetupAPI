import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Express } from 'express';
import 'process';

// This module solves problem with unhandled promise rejection
// https://stackoverflow.com/questions/55504066/how-to-gracefully-handle-promise-rejection-in-express
import 'express-async-errors';
import * as process from 'process';

const initExpressModules = (server: Express) => {
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));
	server.use(cookieParser(process.env['COOKIE_SECRET']));
};

export default initExpressModules;
