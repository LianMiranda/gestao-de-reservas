const tableModel = require("../models/table");
const express = require('express');


class tableController{
    
        async create(req, res){
            try {
                let {restaurantId, number, capacity, location} = req.body;

                const table = await tableModel.register(restaurantId, number, capacity, location);
                
                if(table.status){
                    res.status(200).json({message: "Mesa cadastrado com sucesso"})
                }else{
                    res.status(400).json({message: "Erro ao cadastrar mesa, verifique se todos os campos foram preenchidos", error: table.error})
                }  
            } catch (error) {
                console.log("Erro inesperado: "+error);
                res.status(500).json({error: "Erro interno no servidor"})
            } 
        }

            async find(req, res){
                try {
                     const table = await tableModel.find();
        
                    if(table.status){
                        res.status(200).json({tables: table.result})
                    }else{
                        res.status(404).json({message: "Nenhuma mesa encontrada"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
               
            }
        
            async findById(req, res){
                try {
                    const id = req.params.id;
                
                    const table = await tableModel.findById(id);
        
                    if(table.status){
                        res.status(200).json({table: table.result})
                    }else{
                        res.status(404).json({message: table.status, error: "Não foi possivel encontrar as mesas"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }

            async findByRestaurantId(req, res){
                try {
                    const id = req.params.id;
                
                    const table = await tableModel.findByRestaurantId(id);
                    
                    if(table.status){
                        res.status(200).json({table: table.result})
                    }else{
                        res.status(404).json({message: table.status, error: `Restaurante com id ${id} não encontrado`})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }
        
            async update(req,res){
                try {
                    const id = req.params.id;
                    const verify = await tableModel.findById(id);
                    const {number, capacity, location} = req.body
        
                    if(verify.status){
                        const update = await tableModel.update(id, number, capacity, location);
        
                        if(update.status){
                            res.status(200).json({message: `Mesa com o id ${id} atualizada com sucesso!`});
                        }else{
                            res.status(400).json({message: `Erro ao atualizar mesa com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Mesa com o id ${id} não encontrado`});
                    }
        
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }
        
            async delete(req,res){
                try {
                    const id = req.params.id;
                    const verify = await tableModel.findById(id);
                    
                    if(verify.status){
                        const del = await tableModel.delete(id);
                        
                        if(del.status){
                                res.status(200).json({message: `Mesa com o id ${id} deletado com sucesso`});
                        }else{
                            res.status(400).json({message: `Erro ao deletar mesa com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Mesa com o id ${id} não encontrado`});
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }
        
}

module.exports = new tableController()