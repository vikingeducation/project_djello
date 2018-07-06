const List = require('../models/list');
const shortid = require('shortid');
const { readBoardById, readBoardsByUserId } = require('./board_query');


function createObj(list) {

	const obj = {
		_id: shortid.generate(),
		boardId: list.boardId,
		title: list.title,
		description: list.description || '',
	};
		return obj;
}

function createList(list) {

	const newList = new List({
		_id: shortid.generate(),
		boardId: list.boardId,
		title: list.title,
		description: list.description || '',
	});

	return newList.save()
		.then(savedList => {
			console.log(savedList);
			return savedList;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}

function readListById(listId) {
	return List
		.findById({ _id: listId })
		.populate('cards')
		.then(list => {
			return list;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}


function readListsByBoardId(boardId) {
	return List.find({ boardId: boardId })
		.populate('cards')
		.then(lists => {
			return lists;
		}).catch(err => {
			return new Error(err.stack);
		});
}

function updateList(newlist) {

	return List
		.findById(newlist._id)
		.then(list => {
			return Object.assign(list, { ...newlist });
		}).then(list => {
			return list.save();
		}).then(updatedList => {
			return updatedList;
		}).catch(err => {
			return new Error(err.stack);
		});
}

function deleteList(list) {
	return List
		.findById({ _id: list._id })
		.then(list => {
			return list.remove();
		})
		.then(removedList => {
			return removedList;
		})
		.catch(e => {
			return new Error(e.stack);
		})
}


module.exports = {
	createList,
	readListById,
	readListsByBoardId,
	updateList,
	deleteList
}

