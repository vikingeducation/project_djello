const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const shortid = require('shortid');

function formatBoards(boards) {
	return boards.map(board => {
		return formatBoard(board);
	});
};

function formatBoard(board) {
	if(board)
		return {
			id: board._id,
			userId: board.userId,
			title: board.title,
			lists: board.lists,
			members: board.members
		};
	else
		return {};
};

function updateBoard(title, members) {

	const obj = {}

	if(title) obj.title = title;
	if(members) obj.members.push(members)

	return obj;
}

function deleteCardsByBoard(boardId) {
	List.find({ boardId: boardId })
		.then(lists => {
			if(lists) {
				const qry = lists.map(list => {
					return {
						listId: list._id
					}
				});
				Card.deleteMany().or(qry)
					.then(res => {
						return res;
					})
					.catch(e => {
						return e;
					})
			} else {
				return [];
			}
		})
		.catch(e => {
			return e;
		});
}

exports.getBoards = (req, res) => {	
	Board.find({ userId: req.params.userId })
		.then(boards => {
			res.status(200).json(formatBoards(boards));
		})	
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
};

exports.getBoard = (req, res) => {
	Board.findOne({ _id: req.params.boardId })
		.then(board => {
			res.status(200).json(formatBoard(board));
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.createBoard = (req, res) => {

	let board = new Board({
		_id: shortid.generate(),
		title: req.body.title,
		userId: req.params.userId
	})

	board.save((err, board) => {
		if(err) return err
		res.status(200).json(formatBoard(board));
	});
};

exports.editBoard = (req, res) => {

	const boardObj = updateBoard(req.body.title, req.body.members);

	Board.findById({ _id: req.params.boardId })
		.then(board => {
			if(board) {
				board.set(boardObj);
				board.save(function(err, updatedBoard){
					if(err) return res.status(500).json({ error: e.stack });
					res.status(200).json(formatBoard(updatedBoard));
				})
			}
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		});
}

exports.deleteBoard = (req, res) => {
	
	const boardId = req.params.boardId;

	Promise.all([Board.deleteOne({ _id: boardId }), List.deleteMany({ boardId: boardId }), deleteCardsByBoard(boardId)])
		.then(() => {
			res.status(200).json({ success: `BOARD ${ boardId } DELETED`})
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		})
}





