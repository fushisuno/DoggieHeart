const express = require('express');
const EnderecoController = require('../controllers/EnderecoController')

const router = express.Router();

router.get('/all/', EnderecoController.getAllEndereco)
router.post('/create/', EnderecoController.createEndereco)
router.get('/find/:in_endereco', EnderecoController.getByEnderecoId)
router.put('/update/:in_endereco', EnderecoController.updateEndereco)
router.delete('/delete/:in_endereco', EnderecoController.deleteEndereco)

module.exports = router
