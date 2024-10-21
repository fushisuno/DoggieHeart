const express = require('express');
const helmet = require('helmet');
const path = require('path');
const router = require('./routes/router');
const database = require('./config/db');
const { runMigrations } = require('./config/migrations');

const server = express();

// Configurações do Pug
server.set('view engine', 'pug'); // Define o Pug como mecanismo de template
server.set('views', path.join(__dirname, './views')); // Define o diretório das views

// Configurações de segurança
server.use(helmet());

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
        router.get('/', (req, res) => {
            res.render('./pages/index'); // Renderiza a view index.pug
        });
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