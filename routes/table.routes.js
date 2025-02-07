const express = require('express');
const tableController = require("../controllers/table.controller")
const router = express.Router();

router.post("/table", tableController.create);
router.get("/table", tableController.find);
router.get("/table/:id", tableController.findById);
router.get("/table/restaurant/:id", tableController.findByRestaurantId);
router.put("/table/:id", tableController.update);
router.delete("/table/:id", tableController.delete);

module.exports = router