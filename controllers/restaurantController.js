const addressModel = require("../models/address");
const reservationModel = require("../models/reservation");
const restaurantModel = require("../models/restaurant");
const scheduleModel = require("../models/schedule");
const tableModel = require("../models/table");
const express = require('express');
const generateReport = require("../services/reportService");

class restaurantController {
    async create(req, res){
        try {
             let name = req.body.name;

            if(name){
                const restaurant = await restaurantModel.register(name);
                let restaurantId = restaurant.result.id

                if(restaurant.status){
                    const createTables = await tableModel.autoRegister(restaurantId) 
                    if(createTables.status)
                    res.status(200).json({message: `Restaurante ${name} criado com sucesso`, restaurant: restaurant.result})
                    else
                    res.status(400).json({message: "Erro ao criar as mesas automaticamente"})
                }
            }else{
                res.status(400).json({message: `Erro ao criar restaurante`})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
            
        }
       
    }

    async find(req, res){
        try {
             const restaurants = await restaurantModel.find();

            if(restaurants.status === true){
                res.status(200).json({restaurants})
            }else{
                res.status(404).json({message: "Nenhum restaurante encontrado"})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
       
    }

    async findById(req, res){

        try {
            const id = req.params.id;
        
            const restaurant = await restaurantModel.findById(id);

            if(restaurant.status === true){
                res.status(200).json({restaurant: restaurant.restaurant})
            }else{
                res.status(404).json({message: restaurant.status, error: "Não foi possivel encontrar um restaurante com o id: "+id})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }

        
    }

    //TODO update


    //TODO delete


    async setOpeningHours(req, res){
        try {
            let {day, startHour, finishHour} = req.body
            let restaurantId = req.body.restaurantId
            
            const schedule = await scheduleModel.register(restaurantId, day, startHour, finishHour);
            
            if(schedule.status){
                res.status(200).json({message: "Hora de funcionamento cadastrada com sucesso"})
            }else{
                res.status(400).json({message: "Erro ao cadastrar hora de funcionamento, verifique se todos os campos foram preenchidos", error: schedule.error})
            }  
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
        
    }

    async setAddress(req, res){

        try {
            let {street, neighborhood, number, postalCode, restaurantId} = req.body

            const address = await addressModel.register(street, neighborhood, number, postalCode, restaurantId);

            if(address.status){
                res.status(200).json({message: "Endereço cadastrado com sucesso"})
            }else{
                res.status(400).json({message: "Erro ao cadastrar endereço, verifique se todos os campos foram preenchidos", error: address.error})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
        
    }

    async setReservation(req, res){
        try {
             let {tableId, clientName, clientPhone, reservationDate, reservationTime, status} = req.body

            const reservation = await reservationModel.register(tableId, clientName, clientPhone, reservationDate, reservationTime, status);

            if(reservation.status){
                res.status(200).json({message: "Reserva cadastrado com sucesso"})
            }else{
                res.status(400).json({message: "Erro ao reservar a mesa, verifique se todos os campos foram preenchidos", error: reservation.error})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
       
    }

    async getReservation(req, res){
        try {
            const id = req.params.id
            const reservation = await reservationModel.findById(id)

            if(reservation.status){
                res.status(200).json({message: reservation})
            }else{
                res.status(400).json({message: "Erro ao encontrar a reserva", error: reservation.error})
            }  
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
        
    }

    async report(req, res){
        try {
            const date = "2025-02-22"
            await generateReport(res, date)
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
        
    }

    
}

module.exports = new restaurantController ()