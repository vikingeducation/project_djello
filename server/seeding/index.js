const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongooseeder = require('mongooseeder');
const models = require('../models/index');
const { User, Board, List, Card } = models;
const mongodbUrl = 'mongodb://localhost/project_djello_dev';
const faker = require('faker');

const connect = require('../mongo');

mongooseeder.seed({
	mongodbUrl: mongodbUrl,
	models: models,
	clean: true,
	mongoose: mongoose,
	seeds: () => {
		let users = [];
		let boards = [];
		let lists = [];
		let cards = [];

		// Users.
		for (let u = 0; u < 3; u++) {
			const user = new User({
				username: `user${u + 1}`,
				password: 'foo',
				avatar: faker.image.avatar(),
				fname: faker.name.firstName(),
				lname: faker.name.lastName(),
				about: faker.name.jobDescriptor(),
				boards: []
			});
			users.push(user);

			// Boards.
			for (let b = 0; b < 5; b++) {
				const board = new Board({
					name: `Test User ${u + 1} Board ${b + 1}`,
					user,
					lists: []
				});
				boards.push(board);
				user.boards.push(board);

				// Lists.
				for (let l = 0; l < 5; l++) {
					const list = new List({
						name: `Test User ${u + 1} Board ${b + 1} List ${l + 1}`,
						description: `Test List description ${l + 1}`,
						board,
						cards: []
					});
					lists.push(list);
					board.lists.push(list);

					// Cards.
					for (let c = 0; c < 5; c++) {
						const card = new Card({
							name: `Test User ${u + 1} Board ${b + 1} List ${l + 1} Card ${c +
								1}`,
							description: `Test Card description ${c + 1}`,
							list
						});
						cards.push(card);
						list.cards.push(card);
					}
				}
			}
		}

		const promiseArr = [];
		[cards, lists, boards, users].forEach(models =>
			models.forEach(model => {
				return promiseArr.push(model.save());
			})
		);
		return Promise.all(promiseArr);
	}
});
