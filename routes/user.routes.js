const express = require('express');
const userController = require("../controllers/user.controller")
const router = express.Router();

router.post("/user", userController.create);
router.post("/login", userController.login);
// router.get("/user", userController.find);
// router.get("/user/:id", userController.findById);
// router.get("/user/restaurant/:id", userController.findByRestaurantId);
// router.put("/user/:id", userController.update);
// router.delete("/user/:id", userController.delete);

module.exports = router