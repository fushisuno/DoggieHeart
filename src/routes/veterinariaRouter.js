const express = require('express')
const VeterinariaController = require('../controllers/VeterinariaController')

const { veterinariaAuth } = require('../middleware/Auth.js');

const router = express.Router();


router.get('/', veterinariaAuth, (req, res) => {
    res.render('./pages/veterinaria/dashBoard', {veterinaria : req.session.veterinaria});
});

router.get("/login", (req, res) => {
    const error = req.query.error;
    res.render('./pages/veterinaria/loginVeterinaria')
});

router.get("/cadastro", (req, res) => {
    const error = req.query.error;
    res.render('./pages/veterinaria/cadastroVeterinaria')
});

router.get('/all', VeterinariaController.getAllVeterinaria)
router.post('/create/', VeterinariaController.createVeterinaria)
router.put('/update/:in_veterinaria', VeterinariaController.updateVeterinaria)
router.delete('/delete/:in_veterinaria', VeterinariaController.deleteVeterinaria)
router.get('/find/:in_veterinaria', VeterinariaController.getByVeterinariaId)

module.exports = router