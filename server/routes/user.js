const router = require('express').Router({ mergeParams: true });
const boardRouter = require('./board');
const userController = require('../controllers/user_controller');
const h = require('../helpers');

router.get('/', userController.readAll);
router.get('/:userId', userController.read);
router.get('/:userId/data', userController.readData);
router.post('/:userId/update', userController.updateUser);
router.post('/:userId/delete', userController.deleteUser);

router.use('/:userId/boards', boardRouter);

module.exports = router;