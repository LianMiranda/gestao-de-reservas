const { DataTypes } = require("sequelize");
require('dotenv').config()
const connection = require('../connection');

//TODO Add capacidade de clientes
const Restaurant = connection.define("restaurant", {
    id: {
        type: DataTypes.INTEGER,
        llowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        llowNull: false,
    },
})

Restaurant.sync();

module.exports = Restaurant;