const express = require('express');
const DocumentoController = require('../controllers/DocumentoController');

const router = express.Router();

router.get('/all/', DocumentoController.getAllDocumentos);
router.post('/create/', DocumentoController.createDocumento);
router.put('/update/:in_documento', DocumentoController.updateDocumento);
router.delete('/delete/:in_documento', DocumentoController.deleteDocumento);
router.get('/find/:in_documento', DocumentoController.getByDocumentoId);

module.exports = router;