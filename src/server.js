const express = require('express');
const helmet = require('helmet');
const path = require('path');
const database = require('./config/db');
const { runMigrations } = require('./config/migrations');
const cors = require('cors')
const session = require('express-session');
require('dotenv').config()

const server = express();

server.use(cors());
// Configurações de segurança
server.use(helmet());
server.use(session({
    secret: process.env.PASSWORD_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Defina como true se estiver em HTTPS
        maxAge: 1000 * 60 * 60 // 1 hora 
    } 
}));

const router = require('./routes/router');


// Middleware para parsing de JSON e URL-encoded
server.use(express.json()); // Parsing JSON
server.use(express.urlencoded({ extended: true })); // Parsing de dados do formulário

// Serve arquivos estáticos
server.use(express.static(path.join(__dirname, "../public/")));

// Função assíncrona para iniciar o servidor
const startServer = async () => {
    try {
        // Executa as migrações para criar tabelas, etc.
        await runMigrations();

        // Usar o router para as rotas
        server.use("/", router);

        // Inicia o servidor
        const PORT = process.env.PORT || 8080;
        server.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1); // Sai do processo se houver erro
    }
};

// Função para iniciar o servidor
startServer();

// Middleware para tratamento de erros
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});