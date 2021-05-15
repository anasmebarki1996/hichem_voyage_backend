const express = require("express");
const userController = require("./../../controllers/userController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", authMiddleware.isAdmin, userController.register);
router.post("/getAllUsers", authMiddleware.isAdmin, userController.getAllUsers);
router.post("/getUser", authMiddleware.isAdmin, userController.getUser);
router.post(
  "/updateUserInformations",
  authMiddleware.isAdmin,
  userController.updateUserInformations
);
router.post(
  "/updateUserPassword",
  authMiddleware.isAdmin,
  userController.updateUserPassword
);
router.post("/deleteUser", authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
