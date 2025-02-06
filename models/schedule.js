const { Schedule } = require("../database/associations");

class ScheduleModel{
    async register(restaurantId, day, startHour, finishHour){
   
     try {
            var result = await Schedule.create({restaurantId, day, startHour, finishHour});
            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false, error: error}
        }
    }
    async update(id, day, startHour, finishHour){  
            const updateSchedule = {}

            if(day) updateSchedule.day = day
            if(startHour) updateSchedule.startHour = startHour
            if(finishHour) updateSchedule.finishHour = finishHour
        try {
            const result = await Schedule.update(updateSchedule,{where: {id}});
            return {status: true, result: result} 
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            const result = await Schedule.destroy({where:{id}});
            return {status: true, result: result}

        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            const result = await Schedule.findAll();
            return {status: true, result: result}

        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
            const result = await Schedule.findOne({where:{id: id}});
            
            if(result === null){
                return{status: false}
            }

            return {status: true, result: result}

        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }

    async findByRestaurantId(id){
        try {
            const result = await Schedule.findAll({where:{restaurantId: id}});

            if(result.length === 0){
                return {status: false}; 
            }else{
                return {status: true, result: result}
            }
            

        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }
}

module.exports = new ScheduleModel()