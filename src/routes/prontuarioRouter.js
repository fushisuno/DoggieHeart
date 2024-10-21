const express = require('express');
const ProntuarioController = require('../controllers/ProntuarioController');

const router = express.Router();

router.get('/all/', ProntuarioController.getAllProntuarios);
router.post('/create/', ProntuarioController.createProntuario);
router.put('/update/:in_prontuario', ProntuarioController.updateProntuario);
router.delete('/delete/:in_prontuario', ProntuarioController.deleteProntuario);
router.get('/find/:in_prontuario', ProntuarioController.getByProntuarioId);

module.exports = router;