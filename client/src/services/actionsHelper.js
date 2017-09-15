export const makeOptions = (body, method, token) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    headers,
    method,
    body
  };
  if (token) headers.append("token", token);
  return options;
};
