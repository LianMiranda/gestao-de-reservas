const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const router = express.Router();

router.post("/create", restaurantController.create)
router.get("/find", restaurantController.find)
router.get("/find/:id", restaurantController.findById)
// router.delete("/delete", restaurantController.delete)
// router.put("/update", restaurantController.update);
router.post("/setSchedule", restaurantController.setOpeningHours);
router.post("/setAddress", restaurantController.setAddress);
router.post("/setReservation", restaurantController.setReservation);
router.get("/getReservation/:id", restaurantController.getReservation )

module.exports = router