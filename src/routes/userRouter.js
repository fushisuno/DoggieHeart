const express = require('express');
const Dono = require('../models/Dono')

const router = express.Router();

router.get('/', (req, res) =>{
    res.json()
})

module.exports = router
