# assignment_djello

Project management with that great wobbly taste.

# Live demo:

* https://chuckstaskboards.herokuapp.com/

# Production reset:

* heroku run sequelize db:migrate:undo:all && heroku run sequelize db:migrate &&
  heroku run sequelize db:seed:all

# For Production:

* change fetches urls to server's location

# development setup:

* npm install

* add .env with SECRET key if desired change
* config/config.json to database name
* in root dir run npm start
* --or--
* in root dir run
* npm run server in /client run npm start
