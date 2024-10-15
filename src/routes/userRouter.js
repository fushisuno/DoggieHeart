const express = require('express');

const router = express.Router();

router.get('/:user_name', (req, res) =>{
    res.json({ user: req.params.user_name})
})

module.exports = router
