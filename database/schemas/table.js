const { DataTypes } = require("sequelize");
require('dotenv').config()
const connection = require('../connection');

//TODO Add capacidade de clientesm em cada mesa, localidade da mesa(dentro ou fora do salão)
const Table = connection.define("table", {
    id: {
        type: DataTypes.INTEGER,
        llowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        llowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        llowNull: false,
    }
})

Table.sync();

module.exports = Table;