const LoginModel = require('../models/Login')
const DonoController = require('./DonoController')
const VeterinariaController = require('./VeterinariaController')
const session = require('express-session');

class LoginController {
    static async createLogin(req, res) {
        const { userType, nome, email, senha, crmv, especialidade } = req.body
        try {
            var login = ''
            if (userType != 'adm') {
                login = await LoginModel.createLogin(email, senha)
            }

            if (userType == 'dono') {
                return await DonoController.createDono({
                    body: {
                        nome,
                        email,
                        in_login: login.in_login
                    }
                }, res)
            } else if (userType == 'veterinaria') {
                return await VeterinariaController.createVeterinaria({
                    body: {
                        nome,
                        email,
                        crmv,
                        especialidade,
                        in_login: login.in_login
                    }
                }, res)
            }
            return res.status(201).json(login)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao inserir login" })
        }
    }

    static async updateLogin(req, res) {
        const { in_login } = req.params
        const { user_name, senha } = req.body
        try {
            const validateLog = await LoginModel.getByLoginId(in_login)
            if (!validateLog) {
                return res.status(404).json({ message: "Login não encontrado" })
            }
            const idLogin = await LoginModel.updateLogin(user_name, senha, in_login)
            return res.status(201).json(idLogin)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao inserir login" })
        }
    }

    static async deleteLogin(req, res) {
        const { in_login } = req.params
        try {
            const validateLog = await LoginModel.getByLoginId(in_login)
            if (!validateLog) {
                return res.status(404).json({ message: "Login não encontrado" })
            }
            await LoginModel.deleteLogin(in_login)
            return res.status(201).json({ message: "Login excluido" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao inserir login" })
        }
    }

    static async getByLoginId(req, res) {
        const { in_login } = req.params
        try {
            const validateLog = await LoginModel.getByLoginId(in_login)
            if (!validateLog) {
                return res.status(404).json({ message: "Login não encontrado" })
            }
            const login = await LoginModel.getByLoginId(in_login)
            return res.status(201).json(login)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao inserir login" })
        }
    }

    static async getAllLogin(req, res) {
        try {
            const logins = await LoginModel.getAllLogin()
            return res.status(201).json(logins)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao inserir login" })
        }
    }

    static async loginAuth(req, res) {
        const { user_name, senha } = req.body
        const login = await LoginModel.getByLoginEmail(user_name)

        if (login && login.user_name == user_name && login.senha == senha) {
            req.session.loggedIn = true;
            req.session.in_user = login.in_dono;
            console.log(req.session)
            return res.json({ success: true, message: 'Login realizado com sucesso!' });
        }

        res.status(401).json({ success: false, message: 'Usuário ou senha inválidos!' });
    }
}

module.exports = LoginController