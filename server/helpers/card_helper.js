var UserBoardListCardsHelper = {};

UserBoardListCardsHelper.userBoardListCardsPath = (userId, boardId, listId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/cards`;
UserBoardListCardsHelper.userBoardListCardPath = (userId, boardId, listId, cardId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/cards/${ cardId }`;
UserBoardListCardsHelper.newUserBoardListCardPath = (userId, boardId, listId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/cards/new`;
UserBoardListCardsHelper.editUserBoardListCardPath = (userId, boardId, listId, cardId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/cards/${ cardId }/edit`;
UserBoardListCardsHelper.destroyUserBoardListCardPath = (userId, boardId, listId, cardId) => `/users/${ userId }/boards/${ boardId }/lists/${ listId }/cards/${ cardId }/delete`;

module.exports = UserBoardListCardsHelper;