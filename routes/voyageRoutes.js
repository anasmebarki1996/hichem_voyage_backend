const express = require("express");
const voyageController = require("./../controllers/voyageController");
const router = express.Router();

router.post("/getAllVoyages", voyageController.getAllVoyages);
router.post("/getVoyage", voyageController.getVoyage);
router.post("/createVoyage", voyageController.createVoyage);
router.post("/deleteVoyage", voyageController.deleteVoyage);
router.post("/updateVoyage", voyageController.updateVoyage);

module.exports = router;
