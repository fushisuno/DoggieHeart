const express = require('express');
const donoRouter = require('./donoRouter')
const enderecoRouter = require('./enderecoRouter');
const telefoneRouter = require('./telefoneRouter')
const loginRouter = require('./loginRouter')
const router = express.Router();

router.get('/ping', (req, res) =>{
    res.json({ pong: true})
})

router.use('/dono', donoRouter)
router.use('/endereco', enderecoRouter)
router.use('/telefone', telefoneRouter)
router.use('/login', loginRouter)

module.exports = router
