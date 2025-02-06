const addressModel = require("../models/address");
const express = require('express');
const restaurant = require("../models/restaurant");


class addressController{
    
        async create(req, res){
            try {
                let {street, neighborhood, number, postalCode, restaurantId} = req.body

                const verifyAddress = await addressModel.findByRestaurantId(restaurantId);
                const verifyRestaurantExists = await restaurant.findById(restaurantId);
                
                if(!verifyRestaurantExists.status){
                    res.status(409).json({message:  `O restaurante com id ${restaurantId} não existe!`});
                    return;
                }

                if(verifyAddress.status){
                    res.status(409).json({message:  `O restaurante com id ${restaurantId} já possui um endereço!`});
                    return;
                }

                const address = await addressModel.register(street, neighborhood, number, postalCode, restaurantId);
                
                if(address.status){
                    res.status(200).json({message: "Endereço cadastrado com sucesso"})
                }else{
                    res.status(400).json({message: "Erro ao cadastrar endereço, verifique se todos os campos foram preenchidos corretamente"})
                }

            } catch (error) {
                console.log("Erro inesperado: "+error);
                res.status(500).json({error: "Erro interno no servidor"})
            } 
        }

            async find(req, res){
                try {
                     const address = await addressModel.find();
        
                    if(address.status){
                        res.status(200).json({Endereços: address.result})
                    }else{
                        res.status(404).json({message: "Nenhum endereço encontrado"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
               
            }
        
            async findById(req, res){
                try {
                    const id = req.params.id;
                
                    const address = await addressModel.findById(id);
        
                    if(address.status){
                        res.status(200).json({address: address.result})
                    }else{
                        res.status(404).json({message: address.status, error: "Não foi possivel encontrar os endereços"})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }

            async findByRestaurantId(req, res){
                try {
                    const id = req.params.id;
                
                    const address = await addressModel.findByRestaurantId(id);
                    
                    if(address.status){
                        res.status(200).json({address: address.result})
                    }else{
                        res.status(404).json({message: address.status, error: `Restaurante com id ${id} não encontrado`})
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                } 
            }
        
            async update(req,res){
                try {
                    const id = req.params.id;
                    const verify = await addressModel.findById(id);
                    const {street, neighborhood, number, postalCode} = req.body
        
                    if(verify.status){
                        const update = await addressModel.update(id, street, neighborhood, number, postalCode);

                        console.log("UPDATE!!!!!!!!!!!!: "+update.result);
                        
        
                        if(update.status){
                            res.status(200).json({message: `Endereço com o id ${id} atualizado com sucesso!`});
                        }else{
                            res.status(400).json({message: `Erro ao atualizar endereço com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Endereço com o id ${id} não encontrado`});
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }
        
            async delete(req,res){
                try {
                    const id = req.params.id;
                    const verify = await addressModel.findById(id);
                    
                    if(verify.status){
                        const del = await addressModel.delete(id);
                        
                        if(del.status){
                                res.status(200).json({message: `Endereço com o id ${id} deletado com sucesso`});
                        }else{
                            res.status(400).json({message: `Erro ao deletar endereço com o id ${id}`});
                        }
                    }else{
                        res.status(404).json({message: `Endereço com o id ${id} não encontrado`});
                    }
                } catch (error) {
                    console.log("Erro inesperado: "+error);
                    res.status(500).json({error: "Erro interno no servidor"})
                }
            }
        
}

module.exports = new addressController()