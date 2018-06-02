const Board = require('../models/board');

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
	if(members) obj.members = members;

	return obj;
}


exports.getBoards = (req, res) => {

	const userId = req.params.userId;
	
	Board.find({ userId: userId })
		.then(boards => {
			res.status(200).json(formatBoards(boards));
		})	
		.catch(e => {
			res.status(500).json({ error: e.stack });
		})
};

exports.getBoard = (req, res) => {

	const boardId = req.params.boardId;

	Board.findOne({ _id: boardId })
		.then(board => {
			res.status(200).json(formatBoard(board));
		})
		.catch(e => {
			res.status(500).json({ error: e.stack });
		});
}

exports.createBoard = (req, res) => {

	const userId = req.params.userId;
	const title = req.body.title;

	let board = new Board({
		title: title,
		userId: userId
	})

	board.save((err, board) => {
		if(err) return err
		res.status(200).json(formatBoard(board));
	});
};

exports.editBoard = (req, res) => {

	const boardId = req.params.boardId;
	const boardObj = updateBoard(req.body.title, req.body.members);

	Board.findById({ _id: boardId })
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

	Board.deleteOne({ _id: boardId })
		.then(() => {
			res.status(200).json({ success: `BOARD ${ boardId } DELETED`})
		})
		.catch(e => {
			res.status(500).json({ error: e.stack })
		})
}





