require('dotenv').config()
const express = require('express');
const connection = require('./database/connection');
const Address = require('./database/schemas/address');
const Restaurant = require('./database/schemas/restaurant');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json())


connection.authenticate().then(() => {
    console.log("Conexão com banco de dados feita com sucesso");
}).catch(err => console.log("Erro ao fazer conexão com banco de dados"+ err))

app.listen(process.env.PORT, () =>{
    console.log(`Rodando na porta ${process.env.PORT}`);
})