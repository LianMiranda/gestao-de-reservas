const reservationModel = require("../models/reservation");
const express = require('express');
const generateReport = require("../services/report.service")


class reservationController{
    
        async create(req, res){
            try {
                let {tableId, clientName, clientPhone, reservationDate, reservationTime, status} = req.body;

                const reservation = await reservationModel.register(tableId, clientName, clientPhone, reservationDate, reservationTime, status);
                
                if(reservation.status){
                    res.status(200).json({message: "Reserva cadastrado com sucesso"})
                }else{
                    res.status(400).json({message: "Erro ao cadastrar Reserva, verifique se todos os campos foram preenchidos", error: reservation.error})
                }  
            } catch (error) {
                console.log("Erro inesperado: "+error);
                res.status(500).json({error: "Erro interno no servidor"})
            } 
        }

            async find(req, res){
                try {
                     const reservation = await reservationModel.find();
        
                    if(reservation.status){
                        res.status(200).json({reservations: reservation.result})
                    }else{
                        res.status(404).json({message: "Nenhuma Reserva encontrada"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
               
            }
        
            async findById(req, res){
                try {
                    const id = req.params.id;
                
                    const reservation = await reservationModel.findById(id);
        
                    if(reservation.status){
                        res.status(200).json({reservation: reservation.result})
                    }else{
                        res.status(404).json({message: reservation.status, error: "Não foi possivel encontrar as Reservas"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }

            async findByRestaurantId(req, res){
                try {
                    const id = req.params.id;
                
                    const reservation = await reservationModel.findByRestaurantId(id);
                    
                    if(reservation.status){
                        res.status(200).json({reservation: reservation.result})
                    }else{
                        res.status(404).json({message: reservation.status, error: `Restaurante com id ${id} não encontrado`})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }
        
            async update(req,res){
                try {
                    const id = req.params.id;
                    const verify = await reservationModel.findById(id);
                    const {tableId, clientName, clientPhone, reservationDate, reservationTime, status} = req.body
        
                    if(verify.status){
                        const update = await reservationModel.update(id, tableId, clientName, clientPhone, reservationDate, reservationTime, status);
        
                        if(update.status){
                            res.status(200).json({message: `Reserva com o id ${id} atualizada com sucesso!`});
                        }else{
                            res.status(400).json({message: `Erro ao atualizar Reserva com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Reserva com o id ${id} não encontrado`});
                    }
        
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }
        
            async delete(req,res){
                try {
                    const id = req.params.id;
                    const verify = await reservationModel.findById(id);
                    
                    if(verify.status){
                        const del = await reservationModel.delete(id);
                        
                        if(del.status){
                                res.status(200).json({message: `Reserva com o id ${id} deletado com sucesso`});
                        }else{
                            res.status(400).json({message: `Erro ao deletar Reserva com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Reserva com o id ${id} não encontrado`});
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }

            async report(req, res){
                try {
                    const date = req.params.date;
                    const report = await generateReport(res, date)
        
                    return report;
        
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }     
            }
        
        
}

module.exports = new reservationController()