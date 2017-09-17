export const makeOptions = (body, method, token) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    headers,
    method
  };
  if (token) headers.append("token", token);
  if (body) options.body = body;
  return options;
};
