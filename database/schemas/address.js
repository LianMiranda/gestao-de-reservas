const { Sequelize, DataTypes, Model } = require('sequelize');
const connection = require('../connection');
require('dotenv').config()

const Address = connection.define("address", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood : {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Address.sync();

module.exports = Address;