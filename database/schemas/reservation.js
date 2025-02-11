const { DataTypes } = require('sequelize');
const connection = require('../connection');
require('dotenv').config()

const Reservation = connection.define("reservation", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE"
    },
    clientName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reservationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reservationTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["PENDENTE", "CANCELADO", "CONFIRMADO"]
    }
});

Reservation.sync();

module.exports = Reservation;