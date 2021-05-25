const express = require("express");
const reservationController = require("../../controllers/reservationController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/createReservation",
  authMiddleware.isUser,
  reservationController.createReservation
);
router.post("/getReservation", reservationController.getReservation);
router.post(
  "/getAllReservations",
  authMiddleware.isUser,
  reservationController.getAllReservations
);
module.exports = router;
