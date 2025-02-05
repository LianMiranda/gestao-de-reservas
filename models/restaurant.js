const { Restaurant, Table, Address, Reservation, Schedule } = require("../database/associations");
const reservation = require("./reservation");

class RestaurantModel{
    async register(name){
        try {
            var result = await Restaurant.create({name});
            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async update(id, name){
        try {
            return await Restaurant.update({name},{where: {id}})
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            return await Restaurant.destroy({where:{id}})
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            var restaurant =  await Restaurant.findAll();

            if(restaurant.length === 0){
                return {status: false}
            }
            
            return {status: true, restaurant: restaurant}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
           var restaurant = await Restaurant.findOne({
                where: {id:id},
                attributes: ["id", "name"],
                include: [
                    { model: Address, 
                        as: "address",
                        attributes: ['street', 'neighborhood']
                     }, // Alias 'address'
                    { model: Table, 
                        as: "table", 
                        attributes: ["id", "restaurantId", "number"],
                        include: [
                            { model: Reservation, 
                                as: "reservation",
                                attributes: ["id", "tableId", "clientName", "clientPhone", "reservationDate", "reservationTime"]
                            } // Alias 'reservation'
                        ]
                    },
                    { model: Schedule, 
                        as: "schedule",
                        attributes: ["id", "restaurantId", "day", "startHour", "finishHour"]
                    
                    } // Alias 'schedule'
                ]})

                if(restaurant.lengh === 0){
                    return{status: false}
                }
                
                return {status: true, restaurant: restaurant}

            } catch (error) {
            console.log(error);
            return {status: false, error: error}; 
        }
    }   
    //TODO  reportGenerate (relatorio)
    //Gerar relatorios das mesas reservadas nos dias selecionados 

    async generateReport() {

    }
}





module.exports = new RestaurantModel()