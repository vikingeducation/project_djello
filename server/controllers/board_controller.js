const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const shortid = require('shortid');
const { getBoardData, getListCards, getListsCards, getBoardLists } = require('../lib/query');

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
						return new Error(e.stack);
					})
			} else {
				return [];
			}
		})
		.catch(e => {
			return new Error(e.stack);
		});
}

exports.createBoard = (req, res) => {

	console.log(`REQUEST: ${ req.body }`);


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

				board.save((err, updatedBoard) => {
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

exports.getBoard = (req, res) => {

	getBoardData(req.params.boardId)
		.then(board => {
			if(board)
				res.status(200).json(board);
			else
				res.status(404).json({});
		});
};

exports.getBoards = (req, res) => {	
	Board
		.find({ userId: req.params.userId })
		.then(boards => {
			
			let promises = [];

			boards.forEach(board => {
				promises.push(getBoardData(board._id))
			})

			Promise.all(promises)
				.then(allBoards => {
					console.log(allBoards)
					res.status(200).json(allBoards)
				})
				.catch(e => {
					res.status(500).json({ error: e.stack })
				})

		})	
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
};


























