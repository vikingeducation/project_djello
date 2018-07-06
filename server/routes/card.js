const router = require('express').Router({ mergeParams: true });
const cardController = require('../controllers/card_controller');

router.get('/', cardController.readAll);
router.post('/new', cardController.create);
router.get('/:cardId', cardController.read);
router.post('/:cardId/update', cardController.update);
router.post('/:cardId/delete', cardController.delete);

module.exports = router;