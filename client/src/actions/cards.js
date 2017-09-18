import {
  BASE_URL,
  CARDS_REQUEST,
  CARDS_GET_SUCCESS,
  CARDS_GET_FAILURE
} from "./constants";

export const cardsRequest = () => ({
  type: CARDS_REQUEST
});

export const cardsGetSuccess = data => ({
  type: CARDS_GET_SUCCESS,
  data
});

export const cardsGetFailure = error => ({
  type: CARDS_GET_FAILURE
});

export const cardsGet = () => async dispatch => {
  dispatch(cardsRequest());
  let url = `${BASE_URL}/cards`;
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    dispatch(cardsGetSuccess(result));
  } catch (err) {
    dispatch(cardsGetFailure(err));
  }
};
