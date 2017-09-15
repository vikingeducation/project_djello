export const SET_USER = "SET_USER";
export const SET_BOARDS = "SET_BOARDS";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const ADD_BOARD = "ADD_BOARD";

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

export const loginUser = (email, password) => async dispatch => {
	try {
		const loginParams = {
			email: email,
			password: password
		};

		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(loginParams)
		});

		const parsedResponse = await response.json();

		dispatch(setUser(parsedResponse));
	} catch (error) {
		console.log(error);
	}
};

export const createBoard = userId => async dispatch => {
	try {
		const response = await fetch("/api/boards/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userId })
		});
		const newBoard = await response.json();
		dispatch(addBoard(newBoard));
	} catch (error) {
		console.log(error);
	}
};

export const deleteBoard = id => async dispatch => {
	try {
		await fetch("/api/boards/", {
			method: "DELETE",
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
