const addressModel = require("../models/address");
const reservationModel = require("../models/reservation");
const restaurantModel = require("../models/restaurant");
const scheduleModel = require("../models/schedule");
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
        var restaurants = await restaurantModel.find();

        if(restaurants.status === true){
            res.status(200).json({restaurants})
        }else{
            res.status(404).json({message: "Nenhum restaurante encontrado"})
        }
    }

    async findById(req, res){
        var id = req.params.id;
        
        var restaurant = await restaurantModel.findById(id);

        if(restaurant.status === true){
            res.status(200).json({restaurant})
        }else{
            res.status(404).json({message: "Nenhum restaurante encontrado", error: restaurants.error})
        }
    }

    async setOpeningHours(req, res){
        var {day, startHour, finishHour} = req.body
        var restaurantId = req.body.restaurantId
        
        var schedule = await scheduleModel.register(restaurantId, day, startHour, finishHour);
        
        if(schedule.status){
            res.status(200).json({message: "Hora de funcionamento cadastrada com sucesso"})
        }else{
            res.status(400).json({message: "Erro ao cadastrar hora de funcionamento, verifique se todos os campos foram preenchidos", error: schedule.error})
        }
    }

    async setAddress(req, res){
        var {street, neighborhood, number, postalCode, restaurantId} = req.body

        var address = await addressModel.register(street, neighborhood, number, postalCode, restaurantId);

        if(address.status){
            res.status(200).json({message: "Endereço cadastrado com sucesso"})
        }else{
            res.status(400).json({message: "Erro ao cadastrar endereço, verifique se todos os campos foram preenchidos", error: address.error})
        }
    }

    async setReservation(req, res){
        var {tableId, clientName, clientPhone, reservationDate, reservationTime, status} = req.body

        var reservation = await reservationModel.register(tableId, clientName, clientPhone, reservationDate, reservationTime, status);

        if(reservation.status){
            res.status(200).json({message: "Reserva cadastrado com sucesso"})
        }else{
            res.status(400).json({message: "Erro ao reservar a mesa, verifique se todos os campos foram preenchidos", error: reservation.error})
        }
    }

    async getReservation(req, res){

        var reservation = await reservationModel.find()

        if(reservation.status){
            res.status(200).json({message: reservation})
        }else{
            res.status(400).json({message: "Erro ao reservar a mesa, verifique se todos os campos foram preenchidos", error: reservation.error})
        }
    }

    
}

module.exports = new restaurantController ()