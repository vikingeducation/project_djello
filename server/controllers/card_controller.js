const Card = require('../models/card');
const { format } = require('../lib/format');
const { createCard, readCardById, readCardsByUserId, readCardsByBoardId, updateCard, deleteCard } = require('../lib/card_query');

exports.create = (req, res) => {

	createCard(req.body.card)
		.then(created => {
			res.status(200).json(created);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.read = (req, res) => {

	readCardById(req.params.cardId)
		.then(card => {
			if(card)
				res.status(200).json(card);
			else
				res.status(500).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.readAll = (req, res) => {

	readCardsByListId(req.params.listId)
		.then(cards => {
			if(cards)
				res.status(200).json(format(cards));
			else
				res.status(500).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.update = (req, res) => {

	updateCard(req.body.card)
		.then(updatedCard => {
			console.log(updatedCard);
			res.status(200).json(updatedCard);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.delete = (req, res) => {

	deleteCard(req.body.card)
		.then(() => {
			res.status(200).json(req.body.card);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

























