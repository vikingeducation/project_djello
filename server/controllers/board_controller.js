const Board = require('../models/board');
const { format } = require('../lib/format');
const { createBoard, readBoardById, readBoardsByUserId, updateBoard, deleteBoard } = require('../lib/board_query');

exports.create = (req, res) => {
	createBoard(req.body.board)
		.then(createdBoard => {
			res.status(200).json(createdBoard);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.read = (req, res) => {

	readBoardById(req.params.boardId)
		.then(board => {
			if(board)
				res.status(200).json(board);
			else
				res.status(500).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.readAll = (req, res) => {

	readBoardsByUserId(req.params.userId)
		.then(boards => {
			if(boards)
				res.status(200).json(format(boards));
			else
				res.status(500).json({});
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
}

exports.update = (req, res) => {

	updateBoard(req.body.board)
		.then(updatedBoard => {
			res.status(200).json(updatedBoard);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.delete = (req, res) => {

	deleteBoard(req.body.board)
		.then(board => {
			res.status(200).json(board);
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

























