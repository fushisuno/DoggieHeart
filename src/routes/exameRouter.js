const express = require('express');
const ExameController = require('../controllers/ExameController');

const router = express.Router();

router.get('/all/', ExameController.getAllExames);
router.post('/create/', ExameController.createExame);
router.put('/update/:in_exame', ExameController.updateExame);
router.delete('/delete/:in_exame', ExameController.deleteExame);
router.get('/find/:in_exame', ExameController.getByExameId);

module.exports = router;