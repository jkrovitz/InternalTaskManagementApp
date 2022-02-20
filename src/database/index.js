import { hashSync } from "bcrypt"
import cls from 'cls-hooked'
import { Sequelize } from 'sequelize'
import { registerModels } from "../models"

export default class Database {
	constructor(environment, dbConfig) {
		this.environment = environment
		this.dbConfig = dbConfig
		this.isTestEnvironment = this.environment === 'test' // creating this variable because it will be useful for logging

	}
	async connect() {
		// Set up the namespace for transactions, as Sequlize does not use transactions by default
		const namespace = cls.createNamespace('transactions-namespace');
		Sequelize.useCLS(namespace);

		// Create the conenction
		const { username, password, host, port, database, dialect } = this.dbConfig[this.environment]; // this.dbConfig is going to be the object database.js, and this.environment can be development or test (one of the two keys in the outer-most object in the database.js file)
		this.connection = new Sequelize({ username, password, host, port, database, dialect, logging: this.isTestEnvironment ? false : console.log }) // If we're in a test environment, logging is false, otherwise use console.log in order to log the queries which are very useful
		
		// Check if we connected successfully
		await this.connection.authenticate({ logging: false }) // we don't want to see the query, so we set logging to false
		
		if (!this.isTestEnvironment) { // checking that we are not in a test environment
			console.log('Connection to the database has been established successfully.')
		}
		
		// Register the models
		registerModels(this.connection)

		// Sync the models
		await this.sync();
	}
	
	async disconnect() {
		await this.connection.close();

	}

	async sync(){
		await this.connection.sync({
			logging: false,
			force: this.isTestEnvironment, // if this.isTestEnvironment equals true
		})

		if (!this.isTestEnvironment) {
			console.log('Connection synced successfully')
		}
	}
}