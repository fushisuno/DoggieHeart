const express = require('express');
const donoRouter = require('./donoRouter');
const enderecoRouter = require('./enderecoRouter');
const telefoneRouter = require('./telefoneRouter');
const loginRouter = require('./loginRouter');
const veterinariaRouter = require('./veterinariaRouter');
const animalRouter = require('./animalRouter');
const vacinaRouter = require('./vacinaRouter');
const medicamentoRouter = require('./medicamentoRouter');
const consultaRouter = require('./consultaRouter'); 
const exameRouter = require('./exameRouter');
const documentoRouter = require('./documentoRouter');
const prontuarioRouter = require('./prontuarioRouter');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('./pages/index'); // Renderiza a view index.pug
});
router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

// Integrando as rotas
router.use('/endereco', enderecoRouter);
router.use('/telefone', telefoneRouter);
router.use('/login', loginRouter);
router.use('/dono', donoRouter);
router.use('/veterinaria', veterinariaRouter);
router.use('/animai', animalRouter);
router.use('/vacina', vacinaRouter);
router.use('/medicamento', medicamentoRouter);
router.use('/consulta', consultaRouter);
router.use('/exame', exameRouter);
router.use('/documento', documentoRouter);
router.use('/prontuario', prontuarioRouter);

module.exports = router;