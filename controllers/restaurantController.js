const restaurantModel = require("../models/restaurant");
const tableModel = require("../models/table");
const express = require('express');

class restaurantController {
    async create(req, res){
        var name = req.body.name;

       if(name){
            var restaurant = await restaurantModel.register(name);
            var restaurantId = restaurant.result.id

            if(restaurant.status){
                await tableModel.autoRegister(restaurantId) 
                res.status(200).json({message: `Restaurante ${name} criado com sucesso`, restaurant: restaurant.result})
            }
       }else{
            res.status(400).json({message: `Erro ao criar restaurante`})
       }
    }

    async find(req, res){
        var result = await restaurantModel.find();

        if(result){
            res.status(200).json({result})
        }else{
            res.status(404).json({message: "Nenhum restaurante encontrado"})
        }
    }
}

module.exports = new restaurantController ()