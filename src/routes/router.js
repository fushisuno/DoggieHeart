const express = require('express');
const axios = require('axios');

const animais = require('./animalRouter')
const dono = require('./donoRouter')
const veterinaria = require('./veterinariaRouter')


const EmailController = require('../controllers/EmailController')
const LoginController = require('../controllers/LoginController')


const router = express.Router();
router.get('/', (req, res) => {
    res.redirect('/dono')
});

router.get('/dono', (req, res) => {
    res.render('./pages/dono/home' , {dono : req.session.dono});
});

router.use("/meus-animais", animais)

router.get("/agenda", (req, res) => {
    res.render('./pages/dono/agenda', {dono: req.session.dono})
});

router.get("/documentos", (req, res) => {
    res.render('./pages/dono/documentos', {dono: req.session.dono})
});

router.get("/cadastro", (req, res) => {
    res.render('./pages/dono/cadastro')
});


router.get("/login", (req, res) => {
    const error = req.query.error;
    res.render('./pages/dono/login',  { error })
});


router.post("/login/:user", LoginController.login);
router.get("/logout", LoginController.logout);


router.use('/dono', dono)

router.use('/veterinaria', veterinaria)

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.post('/send-email', EmailController.sendEmail);
router.get('/send-email/veterinaria/:nome/:email/:senha', EmailController.sendEmailVeterinaria);

router.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    if (!/^\d{8}$/.test(cep)) {
        return res.status(400).json({ error: 'CEP inválido' });
    }

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar o CEP:', error.message);
        res.status(500).json({ error: 'Erro ao buscar o CEP. Tente novamente mais tarde.' });
    }
});

module.exports = router;