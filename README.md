# Task Management Application

## Instructions for running the application
1. Copy the ssh link to clone the repo:

2. In the terminal or commandline type: ```git clone git@github.com:jkrovitz/InternalTaskManagementApp.git``` and press enter.

3. Download (if you don't already have it installed) and start Docker Desktop.

4. Download Node if you don't already have it installed.

5. Download Postman if you don't already have it installed.

6. Open a terminal window and cd into the project directory.

7. Type in the terminal: ```npm install```.

8. Type in the terminal: ```docker-compose up -d```.

9. Type in the terminal: ```npx sequelize db:migrate``` to run the dev migration.

10. Type in the terminal: ```npx sequelize db:migrate --env test``` to run the test migration.

11. To run the seeder, you can type the following command: ```npx sequelize-cli db:seed:all --seeders-path src/seeders```.

12. To run the tests, in the terminal type: ```npm run test:watch```. They should all pass.

13. To send requests in Postman, in the terminal type: ```npm run dev```. It should say in the terminal ```Listening at port 8080```. When you see this message, open Postman.

14. In Postman, you can either import **ClickHereDigitalApi.postman_collection.json**, which has example requests that can be run. You can also create your own as well.

15. When you are done making requests in Postman, in the temrinal type ```ctrl``` + ```c``` to quit the node dev environment.

16. Finally, you can type: ```docker-compose down``` to stop the docker containers.

17. If you wish to clear out the database, you can the following command in the terminal (make sure you are in the project directory): ```sh dockerRmVolsAndImgs.sh```.