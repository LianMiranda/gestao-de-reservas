const { Sequelize } = require("sequelize");
require('dotenv').config()

const connection = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    timezone: "-03:00",
    logging: console.log
})

module.exports = connection;