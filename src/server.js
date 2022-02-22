/**
 * This file creates the server.
 *
 * @author Jeremy Krovitz
 */


import './config' // we put import './config' at the top of the file because this is going to execute first
import Database from './database'
import environment from './config/environment' // and then we need to execute or import the environment variables after we have loaded all of our environment variables 
import dbConfig from './config/database'

// immediately invoked function expression
(async () => {
	try {
		const db = new Database(environment.nodeEnv, dbConfig) // create new database and pass in environment and dbConfig
		await db.connect()

		const App = require('./app').default
		const app = new App();
		app.listen()
	} catch (err) {
		console.error('Something went wrong when initializing the server:\n', err.stack) // Logging message and printing the error stack
	}
})()