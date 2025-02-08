const restaurantModel = require("../models/restaurant");
const tableModel = require("../models/table");
const express = require('express');
const generateReport = require("../services/report.service");

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
                
                if(del.status){
                    res.status(200).json({message: `Restaurante com o id ${id} deletado com sucesso`});
                }else{
                    res.status(400).json({message: `Erro ao deletar restaurante com o id ${id}`});
                }
            }else{
                res.status(404).json({message: `Restaurante com o id ${id} não encontrado`});
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            res.status(500).json({error: "Erro interno no servidor"})
        }
    } 
}

module.exports = new restaurantController ()