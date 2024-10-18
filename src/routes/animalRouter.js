const express = require('express');
const AnimalController = require('../controllers/AnimalController')

const router = express.Router();

router.get('/all/', AnimalController.getAllAnimal)
router.post('/create/', AnimalController.createAnimal)
router.put('/update/:in_animal', AnimalController.updateAnimal)
router.delete('/delete/:in_animal', AnimalController.deleteAnimal)
router.get('/find/:in_animal', AnimalController.getByAnimalId)

module.exports = router