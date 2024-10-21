const express = require('express');
const MedicamentoController = require('../controllers/MedicamentoController');

const router = express.Router();

router.get('/all/', MedicamentoController.getAllMedicamentos);
router.post('/create/', MedicamentoController.createMedicamento);
router.put('/update/:in_medicamento', MedicamentoController.updateMedicamento);
router.delete('/delete/:in_medicamento', MedicamentoController.deleteMedicamento);
router.get('/find/:in_medicamento', MedicamentoController.getByMedicamentoId);

module.exports = router;