const DonoModel = require('../models/Dono');
const VeterinariaModel = require('../models/Veterinaria');
const bcrypt = require('bcryptjs');

class LoginController {
    static async login(req, res) {
        const tipo = req.params.user
        const { user_name_or_email, senha } = req.body;

        try {
            var usuario;
            if (tipo == 'veterinaria') {
                usuario = await VeterinariaModel.findByUserNameOrEmail(user_name_or_email);
            } else {
                usuario = await DonoModel.findDonoByUserNameOrEmail(user_name_or_email);
            }
            if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
                req.session.logado = true;
                req.session[tipo] = usuario;
                res.redirect(`/${tipo}`);
            } else {
                res.status(401).redirect('/login?error=Usuário ou senha inválido.');
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/');
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    }
}

module.exports = LoginController;