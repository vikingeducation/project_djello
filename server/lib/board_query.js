const Board = require('../models/board');
const shortid = require('shortid');


function createObj(board) {

	const obj = {
		_id: shortid.generate(),
		userId: board.userId,
		title: board.title,
		description: board.description || '',
	};
		return obj;
}

function createBoard(board) {

	const newBoard = new Board(createObj(board));
	return newBoard.save()
		.then(savedBoard => {
			return savedBoard;
		});
}

function readBoardById(boardId) {
	return Board
		.findById({ _id: boardId })
		.then(board => {
			return board;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function readBoardsByUserId(userId) {
	return Board
		.find({ userId: userId })
		.then(boards => {
			return boards;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function updateBoard(newboard) {
	return Board
		.findById({ _id: newboard._id })
		.then(board => {
			return Object.assign(board, {...newboard})
		})
		.then(board => {
			return board.save();
		})
		.then(updatedBoard => {
			return updatedBoard;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function deleteBoard(board) {
	return Board
		.findById({ _id: board._id })
		.then(doc => {
			return doc.remove();
		})
		.then(deletedBoard => {
			return deletedBoard;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function addIdToBoard(list) {
	return Board
		.findById({ _id: list.boardId })
		.then(board => {
			board.lists.push(list._id);
			return board.save();
		})
		.catch(e => {
			return new Error(e.stack);
		});
}

module.exports = {
	createBoard,
	readBoardById,
	readBoardsByUserId,
	updateBoard,
	deleteBoard,
	addIdToBoard
}

