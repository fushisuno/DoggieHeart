const express = require('express');
const helmet = require('helmet');
const path = require('path')
const router = require('./routes/router')
const database = require('./config/db')
const { runMigrations } = require('./config/migrations')
const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, "../public")))

runMigrations()

server.use("/", router)


server.listen(8080, () =>{
    console.log("Servidor Rodando na porta 8080");
});