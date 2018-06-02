const router = require('express').Router({ mergeParams: true });
const listRouter = require('./list');
const boardController = require('../controllers/board_controller');

router.get('/', boardController.getBoards);
router.post('/new', boardController.createBoard);
router.get('/:boardId', boardController.getBoard);
router.post('/:boardId/edit', boardController.editBoard);
router.post('/:boardId/delete', boardController.deleteBoard);

router.use('/:boardId/lists', listRouter);

module.exports = router;
