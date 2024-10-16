const DonoModel = require('../models/Dono')

class DonoController{
    static createDono(req, res){
        const {nome, email, in_endereco, in_telefone, in_login} = req.body
        try {
            //const dono = await DonoModel.createDono(nome, email, in_endereco, in_telefone, in_login)
            res.status(201).json({ 
                nome: nome,
                email: email
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o usuário' });
        }

    }
    

    static async getAllDono(req, res){
        try {
            const donos = await DonoModel.getAllDono()
            res.status(200).json(donos)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }
}


module.exports = DonoController