const LoginModel = require('../models/Login')

class LoginController{
    static async createLogin(req, res){
        const { user_name, senha } = req.body
        try {
            const login = await LoginModel.createLogin(user_name, senha)
            return res.status(201).json(login)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir login"})
        }
    }

    static async updateLogin(req, res){
        const { in_login } = req.params
        const { user_name, senha } = req.body
        try {
            const validateLog = await LoginModel.getByLoginId(in_login)
            if(!validateLog){
                return res.status(404).json({message: "Login não encontrado"})
            }
            const idLogin = await LoginModel.updateLogin(user_name, senha, in_login)
            return res.status(201).json(idLogin)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir login"})
        }
    }

    static async deleteLogin(req, res){
        const { in_login } = req.params
        try {
            const validateLog = await LoginModel.getByLoginId(in_login)
            if(!validateLog){
                return res.status(404).json({message: "Login não encontrado"})
            }
            await LoginModel.deleteLogin(in_login)
            return res.status(201).json({message: "Login excluido"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir login"})
        }
    }

    static async getByLoginId(req, res){
        const { in_login } = req.params
        try {
            const validateLog = await LoginModel.getByLoginId(in_login)
            if(!validateLog){
                return res.status(404).json({message: "Login não encontrado"})
            }
            const login = await LoginModel.getByLoginId(in_login)
            return res.status(201).json(login)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir login"})
        }
    }

    static async getAllLogin(req, res){
        try {
            const logins = await LoginModel.getAllLogin()
            return res.status(201).json(logins)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir login"})
        }
    }
}

module.exports = LoginController