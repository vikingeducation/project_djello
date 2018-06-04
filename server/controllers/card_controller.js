const Card = require('../models/card');
const shortid = require('shortid');

function formatCards(card) {
	return cards.map(card => {
		return formatCard(card);
	});
};

function formatCard(card) {
	if(card)
		return {
			id: card._id,
			listId: card.listId,
			title: card.title,
			description: card.description,
			position: card.position,
			completed: card.completed,
			members: card.members,
			activity: card.activity
		};
	else
		return {};
};

function updateCard(position, completed, title, description, members, activity) {

	const obj = {}

	if(title) obj.title = title;
	if(description) obj.description = description;
	if(members) obj.members.push(members);
	if(activity) obj.activity.push(activity);
	if(completed === false || completed) obj.completed = completed;
	if(position === 0 || position) obj.position = position;

	return obj;
}


exports.getCards = (req, res) => {

	Card.find({ listId: req.params.listId })
		.then(cards => {
			if(cards)
				res.status(200).json(formatCards(cards));
			else 
				res.status(404).json([]);
		});
}

exports.getCard = (req, res) => {

	Card.findById({ _id: req.params.cardId })
		.then(card => {
			if(card)
				res.status(200).json(formatCard(card));
			else 
				res.status(404).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.createCard = (req, res) => {

	Card.find({ listId: req.params.listId })
		.then(lists => {

			console.log(lists.length);

			const position = lists.length;

			const card = new Card({
				_id: shortid.generate(),
				listId: req.params.listId,
				listName: req.body.listName,
				position: position,
				title: req.body.title,
				description: req.body.description
			})

			card.save(function(err, card) {
				if(err) 
					res.status(500).json({ error: err.stack });
				else 
					res.status(200).json(formatCard(card));
			})
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.editCard = (req, res) => {

	Card.findById({ _id: req.params.cardId })
		.then(card => {
			if(card) {

				const params = updateCard(req.body.position, req.body.completed, req.body.title, req.body.description, req.body.members, req.body.activity);

				card.set(params);
				card.save(function(err, updatedCard) {
					if(err)
						res.status(500).json({ error: err.stack });
					else
						res.status(200).json(formatCard(updatedCard));
				});
			} else {
				res.status(404).json({})
			}
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.deleteCard = (req, res) => {

	Card.deleteOne({ _id: req.params.cardId })
		.then(() => {
			res.status(200).json({ success: `LIST ${ req.params.cardId } DELETED`});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}
