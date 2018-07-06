function format(arr) {

	let boards = {
		byId: {},
		allIds: [],
	};
	let lists = {
		byId: {},
		allIds: [],
	};
	let cards = {
		byId: {},
		allIds: [],
	};


	arr.forEach(board => {

		let listIds = board.lists.map(list => {
			return list._id;
		})

		let currBoard = {
			_id: board._id,
			userId: board.userId,
			title: board.title,
			description: board.description,
			members: board.members,
			lists: listIds
		}

		boards['byId'][currBoard._id] = currBoard;
		boards['allIds'].push(currBoard._id);

		board.lists.forEach(list => {

			let cardIds = list.cards.map(card => {
				return card._id;
			});

			let currList = {
				_id: list._id,
				boardId: list.boardId,
				title: list.title,
				description: list.description,
				completed: list.completed,
				cards: cardIds,
			}

			lists['byId'][currList._id] = currList;
			lists['allIds'].push(currList._id);

			list.cards.forEach(card => {

				let currCard = {
					_id: card._id,
					listId: card.listId,
					title: card.title,
					description: card.description,
					completed: card.completed,
					members: card.members,
					activity: card.activity	
				}

				cards['byId'][currCard._id] = currCard;
				cards['allIds'].push(currCard._id);

			})

		})

	})

	return {
		boards,
		lists,
		cards,
	};

}

module.exports = {
	format
}
