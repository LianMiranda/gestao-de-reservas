const { Restaurant } = require("../database/associations");

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
            var result =  await Restaurant.findAll();
            if(result.length === 0){
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
            return await Restaurant.findOne({where:{id}});
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }
}

module.exports = new RestaurantModel()