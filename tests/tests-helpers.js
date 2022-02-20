import '../src/config' // import necessary environment variables
import Database from '../src/database'
import dbConfig from '../src/config/database'

let db

export default class TestHelpers {
	static async startDb() {
		db = new Database('test', dbConfig); // dbConfig contains the test object which contains information about the test database
		await db.connect()
		return db // in case some of our tests need access to this instance of the database
	}

	static async stopDb() {
		await db.disconnect();
	}

	// Method to reset database; each time we run a test, we are going to drop all of the tables and have a test with a clean database, so we run the syncDb command before each test
	static async syncDb() { 
		await db.sync();
	}

}