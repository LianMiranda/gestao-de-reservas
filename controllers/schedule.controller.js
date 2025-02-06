const scheduleModel = require("../models/schedule");
const express = require('express');


class scheduleController{
    
        async create(req, res){
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

            async find(req, res){
                try {
                     const schedule = await scheduleModel.find();
        
                    if(schedule.status === true){
                        res.status(200).json({Horários: schedule.result})
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
                
                    const schedule = await scheduleModel.findById(id);
        
                    if(schedule.status){
                        res.status(200).json({schedule: schedule.result})
                    }else{
                        res.status(404).json({message: schedule.status, error: "Não foi possivel encontrar os horarios"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }

            async findByRestaurantId(req, res){
                try {
                    const id = req.params.id;
                
                    const schedule = await scheduleModel.findByRestaurantId(id);
                    
                    if(schedule.status){
                        res.status(200).json({schedule: schedule.result})
                    }else{
                        res.status(404).json({message: schedule.status, error: `Restaurante com id ${id} não encontrado`})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }
        
            async update(req,res){
                try {
                    const id = req.params.id;
                    const verify = await scheduleModel.findById(id);
                    const {day, startHour,finishHour} = req.body
        
                    if(verify.status){
                        const update = await scheduleModel.update(id, day, startHour,finishHour);
        
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
        
            async delete(req,res){
                try {
                    const id = req.params.id;
                    const verify = await scheduleModel.findById(id);
                    
                    if(verify.status){
                        const del = await scheduleModel.delete(id);
                        
                        if(del.status){
                                res.status(200).json({message: `Horário com o id ${id} deletado com sucesso`});
                        }else{
                            res.status(400).json({message: `Erro ao deletar horário com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Horário com o id ${id} não encontrado`});
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }
        
}

module.exports = new scheduleController()