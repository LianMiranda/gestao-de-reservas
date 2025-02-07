require('dotenv').config()
const express = require('express');
const connection = require('./database/connection');
const Restaurant = require('./database/schemas/restaurant');
const Address = require('./database/schemas/address');
const Schedule = require('./database/schemas/schedule');
const Table = require('./database/schemas/table');
const Reservation = require('./database/schemas/reservation');
const restaurantRoutes = require("./routes/restaurant.routes")
const scheduleRoutes = require("./routes/schedules.routes")
const addressRoutes = require("./routes/address.routes")
const tableRoutes = require("./routes/table.routes")
const reservationRoutes = require("./routes/reservation.routes")
require("./database/associations")

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use("/", restaurantRoutes, scheduleRoutes, addressRoutes, tableRoutes, reservationRoutes);

connection.authenticate().then(() => {
    console.log("Conexão com banco de dados feita com sucesso");
}).catch(err => console.log("Erro ao fazer conexão com banco de dados"+ err))

app.listen(process.env.PORT, () =>{
    console.log(`Rodando na porta ${process.env.PORT}`);
})