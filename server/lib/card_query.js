const Card = require('../models/card');
const shortid = require('shortid');
const { readBoardsByUserId } = require('../lib/board_query');
const { readListsByBoardId } = require('../lib/list_query');

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
	updateCard,
	deleteCard
}
