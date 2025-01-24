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
    },
    date: {
        type: DataTypes.DATE,
        llowNull: false,
    },
    startHour: {
        type: DataTypes.TIME,
        llowNull: false,
    },
    finishHour: {
            type: DataTypes.TIME,
            llowNull: false,
        }
    })

Schedule.sync();

module.exports = Schedule;