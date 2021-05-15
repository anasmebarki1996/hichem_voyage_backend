const express = require("express");
const authMiddleware = require("./../../middlewares/authMiddleware");
const adminController = require("../../controllers/adminController");
const router = express.Router();

router.post("/register", authMiddleware.isAdmin, adminController.register);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
// router.get("/createVoyage", voyageController.createVoyage);

module.exports = router;
