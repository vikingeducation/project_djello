export const SET_COOKIE = "SET_COOKIE";

export function setCookie(data) {
  return {
    type: SET_COOKIE,
    data
  };
}
