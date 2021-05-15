const express = require("express");
const reservationController = require("../../controllers/reservationController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/createReservation",
  authMiddleware.isUser,
  reservationController.createReservation
);
router.post(
  "/getReservation",
  authMiddleware.isUser,
  reservationController.getReservation
);

module.exports = router;
