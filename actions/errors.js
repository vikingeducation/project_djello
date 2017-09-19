module.exports = event => (client, error) => {
  console.error(error.message);
  console.error(error.stack);
  client.emit(event, error.message);
};
