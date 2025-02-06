const express = require('express');
const scheduleController = require("../controllers/schedule.controller")
const router = express.Router();

router.post("/schedule", scheduleController.create);
router.get("/schedule", scheduleController.find);
router.get("/schedule/:id", scheduleController.findById);
router.get("/schedule/restaurant/:id", scheduleController.findByRestaurantId);
router.put("/schedule/:id", scheduleController.update);
router.delete("/schedule/:id", scheduleController.delete);

module.exports = router