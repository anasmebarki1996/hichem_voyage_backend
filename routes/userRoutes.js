const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/getAllUsers", userController.getAllUsers);
router.post("/getUser", userController.getUser);
router.post("/updateUserInformations", userController.updateUserInformations);
router.post("/updateUserPassword", userController.updateUserPassword);
router.post("/deleteUser", userController.deleteUser);

module.exports = router;
