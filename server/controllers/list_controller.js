const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const shortid = require('shortid');

function formatLists(lists) {
	return lists.map(list => {
		return formatList(list);
	});
};

function formatList(list) {
	if(list)
		return {
			id: list._id,
			boardId: list.boardId,
			title: list.title,
			description: list.description,
			position: list.position,
			completed: list.completed
		};
	else
		return {};
};

function updateList(position, completed, title, description) {

	const obj = {}

	if(title) obj.title = title;
	if(description) obj.description = description;
	if(completed === false || completed) obj.completed = completed;
	if(position === 0 || position) obj.position = position;

	return obj;
}

exports.getList = (req, res) => {

	List.findById({ _id: req.params.listId })
		.then(list => {
			if(list) {
				res.status(200).json(formatList(list));
			} else {
				res.status(404).json({});
			}
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		});
}

exports.getLists = (req, res) => {

	List.find({ boardId: req.params.boardId })
		.then(lists => {
			res.status(200).json(formatLists(lists));
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		});
}

exports.createList = (req, res) => {
	List.find({ boardId: req.params.boardId })
		.then(lists => {
			const position = lists.length;
			const newList = new List({
				_id: shortid.generate(),
				boardId: req.params.boardId,
				title: req.body.title,
				description: req.body.description,
				position: position
			});

			newList.save(function(e, list) {
				if(e) 
					res.status(500).json({ error: e.stack })
				else
					res.status(200).json(formatList(list));
			})
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		});
}

exports.editList = (req, res) => {
	List.findById({ _id: req.params.listId })
		.then(list => {
			if(list) {

				const params = updateList(req.body.position, req.body.completed, req.body.title, req.body.description);

				list.set(params);
				list.save(function(e, updatedList) {
					if(e) 
						res.status(500).json({ error: e.stack });
					else
						res.status(200).json(formatList(updatedList));
				});
			} else {
				res.status(404).json({});
			}
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.deleteList = (req, res) => {

	const listId = req.params.listId;

	Promise.all([List.deleteOne({ _id: listId }), Card.deleteMany({ listId: listId })])
		.then(() => {
			res.status(200).json({ success: `LIST ${ listId } DELETED`});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}




