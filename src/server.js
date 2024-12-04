const express = require('express');
const helmet = require('helmet');
const path = require('path');
const database = require('./config/db');
const { runMigrations } = require('./config/migrations');
const cors = require('cors')
const session = require('express-session');
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser');
require('dotenv').config()

const server = express();

server.use(cors());
server.use(helmet());

const router = require('./routes/router');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, "../public/")));

server.set('views', path.join(__dirname, 'views'))
server.engine('.hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'mainLayout.hbs'
}))
server.set('view engine', '.hbs')

server.use(session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const startServer = async () => {
    try {
        await runMigrations();

        server.use("/", router);

        const PORT = process.env.PORT || 8080;
        server.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
};


startServer();


server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});