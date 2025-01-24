const { Reservation } = require("../database/associations");

class ReservationModel{
    async register(tableId, clientName, clientPhone, reservationDate, reservationTime, status){
        try {
            var result = await Reservation.create({tableId, clientName, clientPhone, reservationDate, reservationTime, status: status == undefined ? "PENDING" : status});

            return {status: true, result: result}
        } catch (error) {
            console.log(error);
            return {status: false}
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
            return await Reservation.findAll();
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
        
    }

    async findById(id){
        try {
            return await Reservation.findOne({where:{id}});
        } catch (error) {
            console.log(error);
            return {status: false}; 
        }
       
    }
}

module.exports = new ReservationModel()