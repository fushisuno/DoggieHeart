const express = require('express');
const DonoController = require('../controllers/DonoController')

const router = express.Router();

router.get('/', DonoController.getAllDono)

module.exports = router
