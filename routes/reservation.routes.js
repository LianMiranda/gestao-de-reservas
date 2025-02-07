const express = require('express');
const reservationController = require("../controllers/reservation.controller")
const router = express.Router();

router.post("/reservation", reservationController.create);
router.get("/reservation", reservationController.find);
router.get("/reservation/:id", reservationController.findById);
router.put("/reservation/:id", reservationController.update);
router.delete("/reservation/:id", reservationController.delete);
router.get("/reservation/report/:date", reservationController.report);

module.exports = router