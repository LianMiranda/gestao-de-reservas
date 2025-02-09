const { DataTypes } = require("sequelize");
require('dotenv').config()
const connection = require('../connection');

//TODO adicionar profileId
const User = connection.define("user", {
    id: {
        type: DataTypes.INTEGER,
        llowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        llowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        llowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        llowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        llowNull: false,
    }, 
    cellphoneNumber: {
        type: DataTypes.STRING,
        llowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        llowNull: false,
    }
})

User.sync();

module.exports = User;