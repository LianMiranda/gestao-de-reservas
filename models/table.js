const { Table } = require("../database/associations");

class TableModel{
    async autoRegister(restaurantId){
        try {
             for (let index = 0; index < 25; index++) {
                await Table.create({
                    restaurantId: restaurantId,
                    number: index + 1,
                    capacity: 5,
                    location: "Salão interno"
                })
             }
            return {status: true}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async register(restaurantId, number, capacity, location){
        try {
            const result = Table.create({restaurantId, number, capacity, location})
            return {status: true, result }
        } catch (error) {
            console.log(error);
            return {status: false, error}
        }
    }

    async update(id, number, capacity, location){
        const updateTable = {}

        if(number) updateTable.number = number
        if(capacity) updateTable.capacity = capacity
        if(location) updateTable.location = location

        try {
            const result = await Table.update(updateTable, {where: {id}});
            return {status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false, error}   
        }     
    }

    async delete(id){
        try {
            const result = await Table.destroy({where:{id}})
            return {status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false, error};
        }
    }

    async find(){
        try {
            const result = await Table.findAll();
            if(result.length === 0){
                return {status: false}; 
            }
            return {status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false, error}; 
        }
        
    }

    async findById(id){
        try {
            const result = await Table.findOne({where:{id}});
            if(result.length === 0){
                return {status: false}; 
            }
            return {status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false, error}; 
        }
       
    }

    async findByRestaurantId(id){
        try {
            const result = await Table.findAll({where:{restaurantId: id}});
            if(result.length === 0){
                return {status: false}; 
            }
            return {status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false, error}; 
        }
       
    }
}

module.exports = new TableModel()