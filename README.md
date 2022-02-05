# AdventureNote ReadMe

### AdventureNote, an EverNote clone, is a website for users to organize and store notes regarding their DnD characters and campaigns.

To launch the application:
  - In both backend and frontend folders, run npm install to install dependencies
  - In the backend folder, use the .env.example to set up your .env file (Make sure to generate a secure JWT token and use a secure password for your database)
  - run psql as an admin user and create the db user using the following command (run from backend folder in terminal):
    - CREATE USER adventurenote_app WITH PASSWORD [password] CREATEDB;
  - run the following commands in terminal to create, migrate, and seed the database:
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all
  - You will need to start servers for both front end and back end. To do so, run the following command in each respective folder:
    - npm start
