const express = require("express");
const voyageController = require("./../../controllers/voyageController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.post("/getAllVoyages", voyageController.getAllVoyages);

// router.post("/getVoyage", authMiddleware.isAdmin, voyageController.getVoyage);

module.exports = router;
