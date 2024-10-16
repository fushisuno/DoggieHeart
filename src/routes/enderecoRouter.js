const express = require('express');
const EnderecoController = require('../controllers/EnderecoController')

const router = express.Router();

router.get('/', EnderecoController.getAllEndereco)
router.post('/', EnderecoController.createEndereco)
router.get('/:in_endereco', EnderecoController.getByEnderecoId)

module.exports = router
