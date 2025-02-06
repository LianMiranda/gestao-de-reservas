const express = require('express');
const restaurantController = require('../controllers/restaurant.controller');
const router = express.Router();

//ROTAS RESTAURANTE
router.post("/create", restaurantController.create)
router.get("/find", restaurantController.find)
router.get("/find/:id", restaurantController.findById)
router.delete("/delete/:id", restaurantController.deleteRestaurant)
router.put("/update/:id", restaurantController.updateRestaurant);


//ROTA ENDEREÇO
router.post("/setAddress", restaurantController.setAddress);
//TODO: TERMINAR ROTAS DOS ENDEREÇOS

//ROTA RESERVA
router.post("/setReservation", restaurantController.setReservation);
router.get("/getReservation/:id", restaurantController.getReservation);
router.get("/reservation/report/:date", restaurantController.report);
//TODO: TERMINAR ROTAS DAS RESERVAS

//ROTA MESAS
router.post("/setTable", restaurantController.setTable);
//TODO: TERMINAR ROTAS DAS MESAS

module.exports = router