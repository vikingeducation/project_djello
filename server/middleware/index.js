function capFirstLetter(resource) {
  return resource.length < 1
    ? resource
    : resource.length < 2
      ? resource.toUpperCase()
      : `${resource.charAt(0).toUpperCase()}${resource.slice(1)}`;
}

const findResourceAndResourceFunction = (req, res, next) => {
  const resource = capFirstLetter(req.params.resource);
  let action, resourceFunction;
  switch (req.method.toUpperCase()) {
    case "GET":
      action = "get";
      resourceFunction = req.params.id
        ? `${action}${resource.slice(0, resource.length - 1)}`
        : `${action}${resource}`;
      break;
    case "POST":
      action = "add";
      resourceFunction = `${action}${resource.slice(0, resource.length - 1)}`;
      break;
    default:
      action = "get";
      resourceFunction = `${action}${resource}`;
  }
  res.locals.resourceFunction = resourceFunction;
  res.locals.resource = resource;
  next();
};

module.exports = {
  findResourceAndResourceFunction
};
