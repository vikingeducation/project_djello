const router = require('express').Router({ mergeParams: true });
const boardRouter = require('./board');
const userController = require('../controllers/user_controller');
const h = require('../helpers');

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.post('/:userId/edit', userController.editUser);
router.post('/:userId/delete', userController.deleteUser);

router.use('/:userId/boards', boardRouter);

module.exports = router;