const router = require('express').Router({ mergeParams: true });
const cardRouter = require('./card');
const listController = require('../controllers/list_controller');

router.get('/', listController.getLists);
router.post('/new', listController.createList);
router.get('/:listId', listController.getList);
router.post('/:listId/edit', listController.editList);
router.post('/:listId/delete', listController.deleteList);

router.use('/:listId/cards', cardRouter);

module.exports = router;