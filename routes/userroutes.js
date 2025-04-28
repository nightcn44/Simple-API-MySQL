const express = require('express');
const router = express.Router();
const User = require('../controllers/usercontrollers');
const { authMiddleware } = require('../middleware/authmiddleware');

router.post('/ur', authMiddleware, User.createUser);
router.get('/ur', authMiddleware, User.getAllUsers);
router.get('/ur/:id', authMiddleware, User.getUserById);
router.put('/ur/:id', authMiddleware, User.updateUserById);
router.delete('/ur/:id', authMiddleware, User.deleteUserById);

module.exports = router;