const Card = require('../models/card');
const shortid = require('shortid');
const { flatten, format } = require('./format');
const { readBoardsByUserId } = require('../lib/board_query');
const { readListsByBoardId, listsPromises } = require('../lib/list_query');

function createObj(card) {

	const obj = {
		_id: shortid.generate(),
		listId: card.listId,
		title: card.title,
		description: card.description
	};
		return obj;
}

function createCard(card) {

	const newCard = new Card(createObj(card));

	return newCard.save()
		.then(savedCard => {
			return savedCard;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function readCardById(cardId) {
	return Card
		.findById({ _id: cardId })
		.then(card => {
			return card;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function readDataByUserId(userId) {

	let obj = {};

	return readBoardsByUserId(userId)
		.then(boards => {
			console.log(boards);
			obj['boards'] = format(boards);
			const promises = listsPromises(boards);
			return Promise.all(promises);
			
		})
		.then(lists => {
			console.log(`lists ${lists}`);
			let flattenLists = flatten(lists);
			obj['lists'] = format(flattenLists);
			const promises = cardsPromises(flattenLists);

			return Promise.all(promises);
		})
		.then(cards => {

			let flattenCards = flatten(cards);
			obj['cards'] = format(flattenCards);

			return obj;
		})
		.catch(e => {
			return new Error(e.stack);
		});
}


function cardsPromises(lists) {
	return lists.map(list => {
		return readCardsByListId(list._id);
	});
}

function readCardsByListId(listId) {
	return Card
		.find({ listId: listId })
		.then(cards => {
			return cards;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function readCardsByLists(lists) {
	return Promise.all(cardsPromises(lists));
}

function updateCard(newcard) {
	return Card
		.findById({ _id: newcard._id })
		.then(card => {
			return Object.assign(card, {...newcard})
		})
		.then(card => {
			return card.save()
		})
		.then(updatedCard => {
			return updatedCard;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function deleteCard(card) {
	return Card
		.findById({ _id: card._id })
		.then(card => {
			return card.remove();
		})
		.then(removedCard => {
			return removedCard;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

module.exports = {
	createCard,
	readCardById,
	readCardsByListId,
	readDataByUserId,
	updateCard,
	deleteCard
}
