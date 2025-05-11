const express = require("express");
const router = express.Router();
const User = require("../controllers/usercontrollers");
const Auth = require("../controllers/authcontrollers");
const { authMiddleware } = require("../middleware/authmiddleware");

router.post("/user", authMiddleware, User.createUser);
router.get("/user", authMiddleware, User.getAllUsers);
router.get("/user/:id", authMiddleware, User.getUserById);
router.put("/user/:id", authMiddleware, User.updateUserById);
router.delete("/user/:id", authMiddleware, User.deleteUserById);

router.post("/register", Auth.register);
router.post("/login", Auth.login);

module.exports = router;
