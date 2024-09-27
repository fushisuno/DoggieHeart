const express = require('express');
const helmet = require('helmet');
const path = require('path')
const router = require('./routes/router')
const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, "../public")))

server.get("/", (req, res) =>{
    res.send("Olá Mundo");
});

server.use("/", router)

server.listen(3000, () =>{
    console.log("Servidor Rodando na porta 3000");
});