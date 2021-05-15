const express = require("express");
const userController = require("./../../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/getUser", authMiddleware.isUser, userController.getUser);
router.post(
  "/updateUserInformations",
  authMiddleware.isUser,
  userController.updateUserInformations
);
router.post(
  "/updateUserPassword",
  authMiddleware.isUser,
  userController.updateUserPassword
);

module.exports = router;
