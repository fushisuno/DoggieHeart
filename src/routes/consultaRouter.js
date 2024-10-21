const express = require('express');
const ConsultaController = require('../controllers/ConsultaController');

const router = express.Router();

router.get('/all/', ConsultaController.getAllConsultas);
router.post('/create/', ConsultaController.createConsulta);
router.put('/update/:in_consulta', ConsultaController.updateConsulta);
router.delete('/delete/:in_consulta', ConsultaController.deleteConsulta);
router.get('/find/:in_consulta', ConsultaController.getByConsultaId);

module.exports = router;