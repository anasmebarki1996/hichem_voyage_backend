const express = require("express");
const voyageController = require("./../../controllers/voyageController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/getAllVoyages",
  authMiddleware.isAdmin,
  voyageController.getAllVoyages
);
router.post("/getVoyage", authMiddleware.isAdmin, voyageController.getVoyage);
router.post(
  "/createVoyage",
  authMiddleware.isAdmin,
  voyageController.createVoyage
);
router.post(
  "/deleteVoyage",
  authMiddleware.isAdmin,
  voyageController.deleteVoyage
);
router.post(
  "/updateVoyage",
  authMiddleware.isAdmin,
  voyageController.updateVoyage
);

module.exports = router;
