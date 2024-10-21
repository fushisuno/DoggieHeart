const express = require('express');
const VacinaController = require('../controllers/VacinaController');

const router = express.Router();

router.get('/all/', VacinaController.getAllVacinas);
router.post('/create/', VacinaController.createVacina);
router.put('/update/:in_vacina', VacinaController.updateVacina);
router.delete('/delete/:in_vacina', VacinaController.deleteVacina);
router.get('/find/:in_vacina', VacinaController.getByVacinaId);

module.exports = router;