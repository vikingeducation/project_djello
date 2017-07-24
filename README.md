# Project Djello

## Introduction
Project Djello is a reproduction of Trello using a fullstack JavaScript stack. 

## Technologies Used
This project uses Express and MongoDB on the back-end, and React/Redux on the front-end. Authentication is done through JSON web-tokens, which are provided upon initial login to the client and are used to authenticate all API requests.

React-sortable-hoc was used to provide basic drag-and-drop functionality for the project.

Jasmine is used for the full-featured test suite on the back end, which can be run with `npm run test` or `yarn test` while inside the server directory.

## Getting Started
To set this project up in your local environment, first clone the repository, then install the dependencies inside the root, server, and client directories using either `npm install` or `yarn`. Then, set up the environmental variable `JWT_SECRET`, either in your shell or in a .env file in the project root directory. This will be used to hash the JSON Web Token. 

Finally, run either `npm run seed` or `yarn seed` inside the server directory to populate your local database. Make sure to have MongoDB running in the background. To test that the server was populated correctly, either run the test suite, or use the REPL provided in the project by running `npm run c`/`yarn run c` or `npm run console`/`yarn run console`. You can use this to run manual queries like the following:

```javascript
User.find().then(lg);
```

To start the project, run `yarn start` in the root directory. If you do not have yarn installed and want to use a different runner, you will need to edit the `start-client.js` file and make the appropriate changes.

## Deployment Link
A deployed version of this project may be found [here.](https://salty-dawn-77328.herokuapp.com/)

You may log in using the following credentials:

Email: foobar0@gmail.com -OR- foobar1@gmail.com

Password: password

## Additional Notes
Whenever a new user is added to a card, they are automatically given full access and editing privileges to that entire board. You can test this by creating a board using foobar0@gmail.com, then adding foobar1@gmail.com. If you then login with foobar1@gmail.com, you will see that they have access to the board as well.

All editable fields can be changed simply by clicking on them. Pressing enter or the submit button will save the changes and clicking away or cancel will dismiss the changes. 

Bootswatch's Flatly theme was used to help style the entire project.