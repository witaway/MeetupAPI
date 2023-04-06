import * as http from 'http';

const initStartServer = (server: http.Server, port: number) => {
	console.log('SETUP - Starting server..');

	server.listen(port, () => {
		console.log(`INFO - Server started on http://localhost:${port}`);
	});

	server.on('error', (error: Error) => {
		console.log(`ERROR - Unable to start server.\nAdditional info: ${error}`);
	});
};

export default initStartServer;
