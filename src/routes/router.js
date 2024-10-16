const express = require('express');
const donoRouter = require('./donoRouter')
const enderecoRouter = require('./enderecoRouter');
const EnderecoController = require('../controllers/EnderecoController');
const router = express.Router();

router.get('/ping', (req, res) =>{
    res.json({ pong: true})
})
router.use('/dono', donoRouter)
router.use('/endereco', enderecoRouter)

module.exports = router
