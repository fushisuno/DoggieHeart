const router = require('express')()
const LoginController = require('../controllers/LoginController')

router.get('/all/', LoginController.getAllLogin)
router.post('/create/', LoginController.createLogin)
router.put('/update/:in_login', LoginController.updateLogin)
router.put('/delete/:in_login', LoginController.deleteLogin)
router.get('/find/:in_login', LoginController.getByLoginId)

module.exports = router