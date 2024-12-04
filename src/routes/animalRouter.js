const express = require('express');
const AnimalController = require('../controllers/AnimalController');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/upload');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Adicionando um sufixo único
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', AnimalController.getAllAnimal)
router.get('/dono', AnimalController.getAllAnimalDono)
router.get('/api/animais', AnimalController.getAllAnimalJson)
router.post('/create', upload.single('foto'), AnimalController.createAnimal)
router.get('/imagem/:in_animal', AnimalController.getImageAnimalId)
router.put('/update/:in_animal', AnimalController.updateAnimal)
router.delete('/delete/:in_animal', AnimalController.deleteAnimal)
router.get('/find/:in_animal', AnimalController.getByAnimalId)

module.exports = router