module.exports = user => {
  return {
    firstName: user.fname,
    lastName: user.lname,
    email: user.email,
    username: user.username
  };
};
