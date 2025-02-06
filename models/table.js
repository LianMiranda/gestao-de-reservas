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
            await Table.create({restaurantId, number, capacity, location})
        
            return {status: true}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async update(id, number, capacity, location){
        const updateTable = {}

        if(number) updateTable.number = number
        if(capacity) updateTable.capacity = capacity
        if(location) updateTable.location = location

        try {
            return await Table.update(updateTable, {where: {id}})
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