const router = require('express').Router({ mergeParams: true });
const listRouter = require('./list');
const boardController = require('../controllers/board_controller');

router.get('/', boardController.readAll);
router.post('/new', boardController.create);
router.get('/:boardId', boardController.read);
router.post('/:boardId/update', boardController.update);
router.post('/:boardId/delete', boardController.delete);

router.use('/:boardId/lists', listRouter);

module.exports = router;
