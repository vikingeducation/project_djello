export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export function LoginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function LoginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}

export function LoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error: error
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

// export function login(data) {
//   return {
//     type: LOGIN,
//     payload: data
//   }
// }