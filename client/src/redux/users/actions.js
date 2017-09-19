import {
  USER_START_FETCH,
  USER_END_FETCH,
  USER_CLEAR_ERROR,
  USER_ERRORED,
  INSERT_USER,
  USER_NOT_FOUND,
  INIT_USER,
  INSERT_BOARD,
  SELECT_BOARD,
  UNSELECT_BOARD,
  INSERT_LIST,
  INSERT_CARD
} from "./constants";

/// refactor to make only 1 set of error handlers for fetches

export const userEndFetch = () => {
  return {
    type: USER_END_FETCH
  };
};

export const userStartFetch = () => {
  return {
    type: USER_START_FETCH
  };
};

export const userClearError = () => {
  return {
    type: USER_CLEAR_ERROR
  };
};

export const userErrored = data => {
  return {
    type: USER_ERRORED,
    payload: data
  };
};

export const insertUser = data => {
  return {
    type: INSERT_USER,
    payload: data
  };
};

const userNotFound = data => {
  return {
    type: USER_NOT_FOUND,
    payload: data
  };
};

export const insertBoard = data => {
  return {
    type: INSERT_BOARD,
    payload: data
  };
};

export const selectBoard = data => {
  return {
    type: SELECT_BOARD,
    payload: data
  };
};

export const unselectBoard = () => {
  return {
    type: UNSELECT_BOARD
  };
};

export const insertList = data => {
  return {
    type: INSERT_LIST,
    payload: data
  };
};

export const insertCard = data => {
  return {
    type: INSERT_CARD,
    payload: data
  };
};

export const createCard = ({ boardId, listId }) => {
  return async dispatch => {
    try {
      const res = await fetch("http://localhost:3000/cards", {
        credentials: "include",
        withCredentials: true,
        method: "POST",
        body: JSON.stringify({
          text: "New card...",
          listId
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (!data || data.error) {
          return;
        }
        dispatch(insertCard({ data, boardId, listId }));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const createList = boardId => {
  return async dispatch => {
    try {
      const res = await fetch("http://localhost:3000/lists", {
        credentials: "include",
        withCredentials: true,
        method: "POST",
        body: JSON.stringify({
          title: "New list...",
          description: "",
          boardId
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (!data || data.error) {
          return;
        }
        dispatch(insertList({ data, boardId }));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const logUserOut = () => {
  return async dispatch => {
    try {
      const res = await fetch("http://localhost:3000/users/logout", {
        method: "GET"
      });
      if (res.status === 200) {
        dispatch(userClearError());
        dispatch(insertUser(INIT_USER));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

// add fetch and error handling !!!
export const createBoard = data => {
  return async dispatch => {
    try {
      const res = await fetch("http://localhost:3000/boards", {
        credentials: "include",
        withCredentials: true,
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (!data || data.error) {
          return;
        }
        dispatch(insertBoard(data));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const fetchUser = ({ email, password }) => {
  return async dispatch => {
    try {
      dispatch(userStartFetch());
      dispatch(userClearError());
      const res = await fetch("http://localhost:3000/users/session", {
        credentials: "include",
        withCredentials: true,
        method: "POST",
        body: JSON.stringify({ username: `${email}`, password: `${password}` }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      dispatch(userEndFetch());
      if (data.error) {
        return dispatch(userNotFound(data.error));
      }
      dispatch(insertUser(data.user));
    } catch (e) {
      dispatch(userEndFetch());
      dispatch(userErrored(e));
    }
  };
};
