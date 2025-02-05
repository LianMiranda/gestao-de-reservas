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
            return await Schedule.update(updateSchedule,{where: {id}}) 
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            return await Schedule.destroy({where:{id}})
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            return await Schedule.findAll();
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
            return await Schedule.findOne({where:{id}});
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }
}

module.exports = new ScheduleModel()