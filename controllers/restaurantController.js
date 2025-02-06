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
             let {name, capacity, cellphoneNumber} = req.body;

            if(name && capacity && cellphoneNumber){
                const restaurant = await restaurantModel.register(name, capacity, cellphoneNumber);
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

            if(restaurant.status){
                res.status(200).json({restaurant: restaurant.restaurant})
            }else{
                res.status(404).json({message: restaurant.status, error: "Não foi possivel encontrar um restaurante com o id: "+id})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }

        
    }

    async updateRestaurant(req,res){
        try {
            const id = req.params.id;
            const verify = await restaurantModel.findById(id);
            const {name, capacity, cellphoneNumber} = req.body

            if(verify.status){
                const update = await restaurantModel.update(id, name, capacity, cellphoneNumber);

                if(update.status){
                    res.status(200).json({message: `Restaurante com o id ${id} atualizado com sucesso!`});
                }else{
                    res.status(400).json({message: `Erro ao atualizar restaurante com o id ${id}`});
                }
            }else{
                res.status(404).json({message: `Restaurante com o id ${id} não encontrado`});
            }

        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async deleteRestaurant(req,res){
        try {
            const id = req.params.id;
            const verify = await restaurantModel.findById(id);
            
            if(verify.status){
                const del = await restaurantModel.delete(id);

                console.log(del);
                
                if(del.status){
                    const tables = await tableModel.deleteByRestaurant(id)

                    if(tables.status){
                        res.status(200).json({message: `Restaurante com o id ${id} deletado com sucesso`});
                    }else{
                        res.status(400).json({message: `Erro ao deletar as mesas do restaurante com o id ${id}`});
                    }
                }else{
                    res.status(400).json({message: `Erro ao deletar restaurante com o id ${id}`});
                }
            }else{
                res.status(404).json({message: `Restaurante com o id ${id} não encontrado`});
            }
        } catch (error) {
            
        }
    }


    async setOpeningHours(req, res){
        try {
            let {day, startHour, finishHour} = req.body
            let restaurantId = req.body.restaurantId
            
            const schedule = await scheduleModel.register(restaurantId, day, startHour, finishHour);
            
            if(schedule.status){
                res.status(200).json({message: "Hora de funcionamento cadastrado com sucesso"})
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

    async setTable(req, res){
        try {
             let {restaurantId, number, capacity, location} = req.body

            const table = await tableModel.register(restaurantId, number, capacity, location);

            if(table.status){
                res.status(200).json({message: "Mesa cadastrada com sucesso"})
            }else{
                res.status(400).json({message: "Erro ao criar a mesa, verifique se todos os campos foram preenchidos", error: reservation.error})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
       
    }

    async setReservation(req, res){
        try {
             let {tableId, clientName, clientPhone, reservationDate, reservationTime, status} = req.body

                const checkReservation = await reservationModel.find();
            
                for(let reservation of checkReservation.result){
                    if (reservation.reservationDate == reservationDate && reservation.tableId == tableId) {
                        return res.status(401).json({ message: `Já existe uma reserva na mesa com id ${tableId} no dia ${reservationDate}` });
                      }
                }

                const reservation = await reservationModel.register(tableId, clientName, clientPhone, reservationDate, reservationTime, status);
    
                if(reservation.status){
                    res.status(200).json({message: "Reserva cadastrada com sucesso"})
                }else{
                    res.status(400).json({message: "Erro ao reservar a mesa, verifique se todos os campos foram preenchidos corretamente"})
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
            const date = req.params.date
            const report = await generateReport(res, date)

            return report;

        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }     
    }

    
}

module.exports = new restaurantController ()