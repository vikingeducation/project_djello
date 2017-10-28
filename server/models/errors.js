module.exports = function(handler) {
  return async function(next) {
    const boundHandler = handler.bind(this);
    try {
      await boundHandler();
    } catch (error) {
      console.error(error);
    }
    next();
  };
};
