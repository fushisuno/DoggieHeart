const express = require('express');
const donoRouter = require('./donoRouter')
const enderecoRouter = require('./enderecoRouter');
const telefoneRouter = require('./telefoneRouter')
const loginRouter = require('./loginRouter')
const veterinariaRouter = require('./veterinariaRouter')
const animalRouter = require('./animalRouter')
const router = express.Router();

router.get('/ping', (req, res) =>{
    res.json({ pong: true})
})

router.use('/dono', donoRouter)
router.use('/endereco', enderecoRouter)
router.use('/telefone', telefoneRouter)
router.use('/login', loginRouter)
router.use('/veterinaria', veterinariaRouter)
router.use('/animal', animalRouter)


module.exports = router