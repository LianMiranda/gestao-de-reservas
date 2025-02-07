const express = require('express');
const restaurantController = require('../controllers/restaurant.controller');
const router = express.Router();

//ROTAS RESTAURANTE
router.post("/create", restaurantController.create)
router.get("/find", restaurantController.find)
router.get("/find/:id", restaurantController.findById)
router.delete("/delete/:id", restaurantController.deleteRestaurant)
router.put("/update/:id", restaurantController.updateRestaurant);


module.exports = router