const router = require('express')()
const TelefoneController = require('../controllers/TelefoneController')

router.get('/', TelefoneController.getAllTelefone)
router.post('/', TelefoneController.createTelefone)
router.put('/:in_telefone', TelefoneController.updateTelefone)
router.delete('/:in_telefone', TelefoneController.deleteTelefone)
router.get('/:in_telefone', TelefoneController.getByTelefoneId)

module.exports = router