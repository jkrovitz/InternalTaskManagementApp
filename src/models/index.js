import fs from 'fs'; // file system
import path from 'path';

let models = {}; // models object, the object we are going to populate with the classes that represent our models

export function registerModels(sequelize) {
	const thisFile = path.basename(__filename); // __filename means the absolute path to the index.js file
	const modelFiles = fs.readdirSync(__dirname); // __dirname is the path to the models folder; readdirSync is a function to read all of the files inside that folder
	const filteredModelFiles = modelFiles.filter(file => {
		return file !== thisFile && file.slice(-3) === '.js' // read all of the files that are not this file, so read all of the files that are not index.js and all of the files that end with a .js extension.
	}) // we now have an array of files and need to iterate through the array

	// populate all of the object for all of these models
	for (const file of filteredModelFiles) {
		const model = require(path.join(__dirname, file)).default(sequelize) // import or require the file and use path.join dirname with the name of the file and we're going to import the default export. To the default export we're going to pass a sequelize instance.
		models[model.name] = model; // we have the model, the class representing the model; this is going to be an object representing the keys as the name of the model and the value is going to be the class representing that model
	}

	// Call associate method on each of the models
	Object.keys(models).forEach(modelName => {
		if (models[modelName].associate) {
			models[modelName].associate(models); // To this associate method we are going to pass all of the models
		}
	})

	// set additional key apart from the models and that is going to be the sequelize instance; so apart from the models, the models object is going to have the sequelize instance as well
	models.sequelize = sequelize;
}

export default models
