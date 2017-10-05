// When you require this module, call the outer function with the name of the
// event you want to emit in case of errors in your event handlers

// The middle function is an event handler, pass it the client and the
// appropriate handler function

// When the event is triggered, the handler will be called with the client and
// the payload of the event

module.exports = errorEvent => (client, handler) => async payload => {
  try {
    await handler(client, payload);
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    client.emit(errorEvent, error.message);
  }
};
