const router = require('express').Router({ mergeParams: true });
const boardRouter = require('./board');
const userController = require('../controllers/user_controller');
const h = require('../helpers');

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.post('/:userId/edit', userController.verifyUser, userController.editUser);
router.post('/:userId/delete', userController.verifyUser, userController.deleteUser);

router.use('/:userId/boards', userController.verifyUser, boardRouter);

module.exports = router;