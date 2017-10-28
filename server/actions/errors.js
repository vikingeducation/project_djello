// After requiring this module, call the outer function with the client you
// need to emit to and the name of the event you want to emit in case of errors

// The middle function is the event handler wrapper, pass it the appropriate
// handler function

// When the event fires, the given handler will be called with the client and
// the payload of the event

module.exports = (client, errorEvent) => handler => async (...payload) => {
  try {
    await handler(client, ...payload);
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    client.emit(errorEvent, error.message);
  }
};
