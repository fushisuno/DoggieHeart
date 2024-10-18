const router = require('express')()
const VeterinariaController = require('../controllers/VeterinariaController')


router.get('/all/', VeterinariaController.getAllVeterinaria)
router.post('/create/', VeterinariaController.createVeterinaria)
router.put('/update/:in_veterinaria', VeterinariaController.updateVeterinaria)
router.delete('/delete/:in_veterinaria', VeterinariaController.deleteVeterinaria)
router.get('/find/:in_veterinaria', VeterinariaController.getByVeterinariaId)

module.exports = router