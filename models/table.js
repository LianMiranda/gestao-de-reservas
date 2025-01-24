const { Table } = require("../database/associations");

class TableModel{
    async autoRegister(restaurantId){
        try {
             for (let index = 0; index < 25; index++) {
                await Table.create({
                    restaurantId: restaurantId,
                    number: index + 1
                })
             }
            return {status: true}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async register(restaurantId, num){
        try {
            await Table.create({
                restaurantId: restaurantId,
                number: num,
            })
        
            return {status: true}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async update(id, name){
        try {
            if(name){
                return await Table.update({name},{where: {id}})
            }    
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            return await Table.destroy({where:{id}})
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            return await Table.findAll();
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
            return await Table.findOne({where:{id}});
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }
}

module.exports = new TableModel()