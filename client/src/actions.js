export const SET_USER = "SET_USER";
export const SET_BOARDS = "SET_BOARDS";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const ADD_BOARD = "ADD_BOARD";
export const ADD_LIST = "ADD_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
export const UPDATE_LIST = "EDIT_LIST";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_CARD = "REMOVE_CARD";

export const setUser = data => ({
	type: SET_USER,
	data: data
});

export const setBoards = data => ({
	type: SET_BOARDS,
	data: data
});

export const addBoard = data => ({
	type: ADD_BOARD,
	data: data
});

export const removeBoard = id => ({
	type: REMOVE_BOARD,
	data: id
});

export const addList = (boardId, list) => ({
	type: ADD_LIST,
	data: { boardId: boardId, list: list }
});

export const removeList = id => ({
	type: REMOVE_LIST,
	data: id
});

export const updateList = (boardId, listId, list) => ({
	type: UPDATE_LIST,
	data: {
		listId: listId,
		boardId: boardId,
		list: list
	}
});

export const addCard = (listId, card) => ({
	type: ADD_CARD,
	data: { listId: listId, card: card }
});

export const removeCard = id => ({
	type: REMOVE_CARD,
	data: id
});

export const returningUser = () => async dispatch => {
	try {
		const response = await fetch("/login", {
			method: "GET",
			credentials: "include"
		});

		const parsedResponse = await response.json();

		dispatch(setBoards(parsedResponse.boards));
		dispatch(setUser(parsedResponse.user));
	} catch (error) {
		console.log(error);
	}
};

export const loginUser = (email, password) => async dispatch => {
	try {
		const loginParams = {
			email: email,
			password: password
		};

		const response = await fetch("/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(loginParams)
		});

		const parsedResponse = await response.json();

		dispatch(setBoards(parsedResponse.boards));
		dispatch(setUser(parsedResponse.user));
	} catch (error) {
		console.log(error);
	}
};

export const createBoard = userId => async dispatch => {
	try {
		const response = await fetch("/api/boards/new", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userId })
		});
		const newBoard = await response.json();
		newBoard.Lists = [];
		dispatch(addBoard(newBoard));
	} catch (error) {
		console.log(error);
	}
};

export const deleteBoard = id => async dispatch => {
	try {
		await fetch("/api/boards/", {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});

		dispatch(removeBoard(id));
	} catch (error) {
		console.log(error);
	}
};

export const createList = (boardId, boardIndex) => async dispatch => {
	try {
		const response = await fetch("/api/lists/new", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ boardId, boardIndex })
		});

		const newList = await response.json();
		newList.Cards = [];
		dispatch(addList(boardId, newList));
	} catch (error) {
		console.log(error);
	}
};

export const deleteList = id => async dispatch => {
	try {
		await fetch("/api/lists", {
			method: "DELETE",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id })
		});

		dispatch(removeList(id));
	} catch (error) {
		console.log(error);
	}
};

export const editList = (boardId, listId, field, data) => async dispatch => {
	try {
		const response = await fetch("/api/lists", {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: listId, field, data })
		});

		const updatedList = await response.json();

		dispatch(updateList(boardId, listId, updatedList));
	} catch (error) {
		console.log(error);
	}
};

export const createCard = (listId, listIndex) => async dispatch => {
	try {
		const response = await fetch("/api/cards/new", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ listId, listIndex })
		});

		const newCard = await response.json();
		dispatch(addCard(listId, newCard));
	} catch (error) {
		console.log(error);
	}
};

export const deleteCard = id => async dispatch => {
	try {
		await fetch("/api/cards", {
			method: "DELETE",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id })
		});

		dispatch(removeCard(id));
	} catch (error) {
		console.log(error);
	}
};
