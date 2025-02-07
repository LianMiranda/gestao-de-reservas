const { DataTypes } = require("sequelize");
require('dotenv').config()
const connection = require('../connection');


const Schedule = connection.define("schedule", {
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
    day: {
        type: DataTypes.STRING,
        llowNull: false,
    },
    startHour: {
        type: DataTypes.STRING,
        llowNull: false,
    },
    finishHour: {
            type: DataTypes.STRING,
            llowNull: false,
        }
    })

Schedule.sync();

module.exports = Schedule;