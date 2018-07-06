const List = require('../models/list');
const { format } = require('../lib/format');
const { removeIdFromBoard } = require('../lib/board_query');
const { createList, readListById, readListsByUserId, readListsByBoardId, updateList, deleteList } = require('../lib/list_query');

exports.create = (req, res) => {

	createList(req.body.list)
		.then(created => {
			res.status(200).json(created);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.read = (req, res) => {

	readListById(req.params.listId)
		.then(list => {
			if(list)
				res.status(200).json(list);
			else
				res.status(500).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.readAll = (req, res) => {

	readListsByBoardId(req.params.boardId)
		.then(lists => {
			if(lists)
				res.status(200).json((lists));
			else
				res.status(500).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.update = (req, res) => {

	updateList(req.body.list)
		.then(updatedList => {
			res.status(200).json(req.body.list);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.delete = (req, res) => {

	deleteList(req.body.list)
		.then(() => {
			res.status(200).json(req.body.list);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

























