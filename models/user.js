const {User, Restaurant } = require("../database/associations");
const bcrypt = require('bcrypt');

class UserModel{
    async register(email, password, firstName, lastName, cellphoneNumber, cpf){
        try {
            var result = await User.create({email, password, firstName, lastName, cellphoneNumber, cpf});
            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async update(id, email, password, firstName, lastName, cellphoneNumber, cpf){
        const updateUser = {}

        if(email) updateUser.email = email
        if(password) updateUser.password = password
        if(firstName) updateUser.firstName = firstName
        if(lastName) updateUser.lastName = lastName
        if(cellphoneNumber) updateUser.cellphoneNumber = cellphoneNumber
        if(cpf) updateUser.cpf = cpf

        try {
            var result = await User.update(updateUser, {where: {id}})
            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            const result = await User.destroy({where:{id}});
            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            const result =  await User.findAll();

            if(result.length === 0){
                return {status: false}
            }
            
            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findByEmail(email){
        try {
            const result =  await User.findOne({where:{email}});
            console.log(result);
            
            if(result == null){
                return {status: false}
            }
            
            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
           var result = await User.findOne({
                where: {id},
                include: [
                    { model: Restaurant, 
                        as: "restaurant",
                        attributes: ['id', 'name']
                     },
                ]})

                if(result.lengh === 0){
                    return{status: false}
                }
                
                return {status: true, result: result}

            } catch (error) {
            console.log(error);
            return {status: false, error: error}; 
        }
    }

    
}





module.exports = new UserModel()