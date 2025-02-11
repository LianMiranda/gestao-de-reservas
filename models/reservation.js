const { Reservation, Table, Restaurant } = require("../database/associations");

class ReservationModel{
    async register(tableId, clientName, clientPhone, reservationDate, reservationTime, status){
        try {
            const result = await Reservation.create({tableId, clientName, clientPhone, reservationDate, reservationTime, status: status == undefined ? "CONFIRMADO" : status});
            return {status: true, result: result}
            
        } catch (error) {
            console.log(error);
            return {status: false, error: error}
        }
    }

    async update(id, tableId, clientName, clientPhone, reservationDate, reservationTime, status){  
            const updateReservation = {}

            if(tableId) updateReservation.tableId = tableId
            if(clientName) updateReservation.clientName = clientName
            if(clientPhone) updateReservation.clientPhone = clientPhone
            if(reservationDate) updateReservation.reservationDate = reservationDate
            if(reservationTime) updateReservation.reservationTime = reservationTime
            if(status) updateReservation.status = status

        try {
            const result = await Reservation.update(updateReservation,{where: {id}});
            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            const result =await Reservation.destroy({where:{id}})
            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            const result = await Reservation.findAll(
                {
                    include: [{
                        model: Table, 
                            as: "table", 
                            attributes: ["id", "restaurantId", "number", "capacity", "location"],
                        }],
                }
            );

            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
            const result = await Reservation.findOne({
                where:{id},
                include: [{
                    model: Table, 
                        as: "table", 
                        attributes: ["id", "restaurantId", "number", "capacity", "location"],
                        include: [
                            {model: Restaurant,
                                as: "restaurant",
                                attributes: ["name"]

                        }]
                }],
                attributes:["id", "clientName", "clientPhone", "reservationDate", "reservationTime", "status"]
            });
            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }

    async findReservationByDate(date){
        try {
            const result = await Reservation.findAll({
                where: {reservationDate: date},
                include: [
                    { 
                        model: Table, 
                        as: "table", 
                        attributes: ["id", "restaurantId", "number", "capacity", "location"],
                    }]});                    

            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
    }

}

module.exports = new ReservationModel()