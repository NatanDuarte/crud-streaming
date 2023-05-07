const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/all', authMiddleware, userController.getUsers);
router.get('/get/:id', authMiddleware, userController.getUserById);
router.put('/put/:id', authMiddleware, userController.updateUser);
router.delete('/delete/:id', authMiddleware, userController.deleteUser);

module.exports = router;
