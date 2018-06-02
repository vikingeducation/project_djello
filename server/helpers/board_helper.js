var UserBoardsHelper = {};

UserBoardsHelper.userBoardsPath = (userId) => `/users/${ userId }/boards`;
UserBoardsHelper.userBoardPath = (userId, boardId) => `/users/${ userId }/boards/${ boardId }`;
UserBoardsHelper.newUserBoardPath = (userId) => `/users/${ userId }/boards/new`;
UserBoardsHelper.editUserBoardPath = (userId, boardId) => `/users/${ userId }/boards/${ boardId }/edit`;
UserBoardsHelper.destroyUserBoardPath = (boardId) => `/users/${ userId }/boards/${ boardId }/delete`;

module.exports = UserBoardsHelper;