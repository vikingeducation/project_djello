export const SET_USER = "SET_USER";
export const SET_BOARDS = "SET_BOARDS";

export const setUser = data => {
	console.log("Hit the action... ", data);
	return {
		type: SET_USER,
		data: data
	};
};

export const setBoards = data => {
	return {
		type: SET_BOARDS,
		data: data
	};
};

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
