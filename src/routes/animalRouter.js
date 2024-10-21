const express = require('express');
const AnimalController = require('../controllers/AnimalController')

const router = express.Router();

router.get('/animais', AnimalController.getAllAnimal)
router.get('/api/animais', AnimalController.getAllAnimalJson)
router.post('/animal/create', AnimalController.createAnimal)
router.put('/animal/update/:in_animal', AnimalController.updateAnimal)
router.delete('/delete/:in_animal', AnimalController.deleteAnimal)
router.get('/find/:in_animal', AnimalController.getByAnimalId)

module.exports = router