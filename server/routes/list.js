const router = require('express').Router({ mergeParams: true });
const cardRouter = require('./card');
const listController = require('../controllers/list_controller');

router.get('/', listController.readAll);
router.post('/new', listController.create);
router.get('/:listId', listController.read);
router.post('/:listId/update', listController.update);
router.post('/:listId/delete', listController.delete);

router.use('/:listId/cards', cardRouter);

module.exports = router;