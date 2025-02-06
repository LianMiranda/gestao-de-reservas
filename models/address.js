const { Address } = require("../database/associations");

class AddressModel{
    async register(street, neighborhood, number, postalCode, restaurantId){
        try {
            var result = await Address.create({street, neighborhood, number, postalCode, restaurantId});
            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }

    async update(id, street, neighborhood, number, postalCode){
        const updateAddress = {}

        if(street) updateAddress.street = street
        if(neighborhood) updateAddress.neighborhood = neighborhood
        if(number) updateAddress.number = number
        if(postalCode) updateAddress.postalCode = postalCode
        
        try {
            return await Address.update(updateAddress,{where: {id}})
        } catch (error) {
            console.log(error);
            return {status: false, error: error}   
        }     
    }

    async delete(id){
        try {
            return await Address.destroy({where:{id}})
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            return await Address.findAll();
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
            return await Address.findOne({where:{id}});
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }      
    }

    async findByRestaurantId(id){
        try {
            return await Address.findOne({where:{restaurantId: id}});
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }      
    }
}

module.exports = new AddressModel()