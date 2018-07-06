var UserBoardListsHelper = {};

UserBoardListsHelper.userBoardListsPath = (userId, boardId) => `/users/${ userId }/boards/${ boardId }/lists`;
UserBoardListsHelper.userBoardListPath = (userId, boardId, listId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }`;
UserBoardListsHelper.newUserBoardListPath = (userId, boardId) => `/users/${ userId }/boards/${ boardId }/lists/new`;
UserBoardListsHelper.editUserBoardListPath = (userId, boardId, listId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/edit`;
UserBoardListsHelper.destroyUserBoardListPath = (userId, boardId, listId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/delete`;

module.exports = UserBoardListsHelper;