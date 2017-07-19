export const GET_ALL_BOARDS_REQUEST = 'GET_ALL_BOARDS_REQUEST'
export const GET_ALL_BOARDS_SUCCESS = 'GET_ALL_BOARDS_SUCCESS'
export const GET_ALL_BOARDS_FAILURE = 'GET_ALL_BOARDS_FAILURE'
export const LOGOUT = 'LOGOUT';

export function getAllBoardsRequest() {
  return {
    type: GET_ALL_BOARDS_REQUEST
  };
}

export function getAllBoardsSuccess(data) {
  return {
    type: GET_ALL_BOARDS_SUCCESS,
    data
  };
}

export function getAllBoardsFailure(error) {
  return {
    type: GET_ALL_BOARDS_FAILURE,
    error
  };
}


export function getAllBoards(token, userId) {
    let config = {
      method: 'GET',
      headers: { 'Authorization':'Bearer ' + token },
    };
  
    return dispatch => {
      dispatch(getAllBoardsRequest())
  
      fetch(`api/v1/users/${userId}/boards`, config)
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          return response.json();
        })
        .then(json => {
          let boardIds = json.data.map(board => board._id);
          let specificBoard = json.data[0];
          dispatch(getAllBoardsSuccess({boardIds, specificBoard}));
        })
        .catch(error => {
          console.log(error);
          dispatch(getAllBoardsFailure(error));
        });
    }
  }