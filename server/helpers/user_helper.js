var UsersHelper = {};

UsersHelper.usersPath = () => '/users/';
UsersHelper.userPath = (userId) => `/users/${ userId }`;
UsersHelper.newUserPath = () => '/users/new';
UsersHelper.editUserPath = (userId) => `/users/${ userId }/edit`;
UsersHelper.destroyUserPath = (userId) => `/users/${ userId }/delete`;

module.exports = UsersHelper;