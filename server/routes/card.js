const router = require('express').Router({ mergeParams: true });
const cardController = require('../controllers/card_controller');

router.get('/', cardController.getCards);
router.get('/:cardId', cardController.getCard);
router.post('/new', cardController.createCard);
router.post('/:cardId/edit', cardController.editCard);
router.post('/:cardId/delete', cardController.deleteCard);

module.exports = router;