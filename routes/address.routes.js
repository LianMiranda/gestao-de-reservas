const express = require('express');
const addressController = require("../controllers/address.controller")
const router = express.Router();

router.post("/address", addressController.create);
router.get("/address", addressController.find);
router.get("/address/:id", addressController.findById);
router.get("/address/restaurant/:id", addressController.findByRestaurantId);
router.put("/address/:id", addressController.update);
router.delete("/address/:id", addressController.delete);

module.exports = router