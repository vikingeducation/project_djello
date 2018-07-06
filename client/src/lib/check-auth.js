import { setClient } from '../client/actions';
import jwtDecode from 'jwt-decode';

function checkAuthorization (dispatch) {

  const storedToken = localStorage.getItem('token');

  if(storedToken) {

    const token = jwtDecode(storedToken);
    const user = {
      _id: token._id,
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      role: token.role
    }

    const expiration = token.exp;
    const current = Date.now()/1000;

    console.log(expiration > current);

    if(current > expiration) return false

    dispatch(setClient({ token: storedToken, user: user }))
    return true

  }

  return false

}

export function checkDashboardAuthorization({ dispatch, getState }) {

    const client = getState().client;

    console.log(client);

    if(client && client.token) return true;

    if(checkAuthorization(dispatch)) return true;

    return false;

}