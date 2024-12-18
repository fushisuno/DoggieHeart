const express = require('express');
const DonoController = require('../controllers/DonoController')

const router = express.Router();

router.get('/',DonoController.getAllDono)
router.get('/api', DonoController.getAllDonoJson)
router.post('/create/', DonoController.createDono)
router.put('/update/:in_dono', DonoController.updateDono)
router.delete('/delete/:in_dono', DonoController.deleteDono)
router.get('/find/:in_dono', DonoController.getByDonoId)

module.exports = router