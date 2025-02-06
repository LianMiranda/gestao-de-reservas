const { Reservation, Table } = require("../database/associations");

class ReservationModel{
    async register(tableId, clientName, clientPhone, reservationDate, reservationTime, status){
        //TODO não permitir reservas na mesma mesa no mesmo dia
        try {
            var result = await Reservation.create({tableId, clientName, clientPhone, reservationDate, reservationTime, status: status == undefined ? "CONFIRMADO" : status});
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
            return await Reservation.update(updateReservation,{where: {id}}) 
        } catch (error) {
            console.log(error);
            return {status: false}   
        }     
    }

    async delete(id){
        try {
            return await Reservation.destroy({where:{id}})
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }

    async find(){
        try {
            var result = await Reservation.findAll(
                {
                    include: [{
                        model: Table, 
                            as: "table", 
                            attributes: ["id", "restaurantId", "number"],
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
            return await Reservation.findOne({
                where:{id},
                include: [{
                    model: Table, 
                        as: "table", 
                        attributes: ["id", "restaurantId", "number"],
                }],
                attributes:["id", "clientName", "clientPhone", "reservationDate", "reservationTime", "status"]
            });
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
                    { model: Table, 
                        as: "table", 
                        attributes: ["id", "restaurantId", "number"]
                    }]});

            return{status: true, result}
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
    }
}

module.exports = new ReservationModel()