const express = require('express');
const AnimalController = require('../controllers/AnimalController')

const router = express.Router();

router.get('/', AnimalController.getAllAnimal)
router.get('/dono', AnimalController.getAllAnimalDono)
router.get('/api/animais', AnimalController.getAllAnimalJson)
router.post('/create', AnimalController.createAnimal)
router.put('/update/:in_animal', AnimalController.updateAnimal)
router.delete('/delete/:in_animal', AnimalController.deleteAnimal)
router.get('/find/:in_animal', AnimalController.getByAnimalId)

module.exports = router