const { DataTypes } = require("sequelize");
require('dotenv').config()
const connection = require('../connection');

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
        onDelete: "CASCADE"
    },
    number: {
        type: DataTypes.INTEGER,
        llowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        llowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        llowNull: false,
    }
})

Table.sync();

module.exports = Table;