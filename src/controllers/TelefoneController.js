const TelefoneModel = require('../models/Telefone')

class TelefoneController{
    static async createTelefone(req, res){
        const { ddd, numero } = req.body
        try {
            const idTelefone = await TelefoneModel.createTelefone(ddd, numero)
            return res.status(201).json(idTelefone)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao inserir telefone" })
        }
    }

    static async updateTelefone(req, res){
        const { in_telefone } = req.params
        const { ddd, numero } = req.body
        try {
            const validateTel = await TelefoneModel.getByTelefoneId(in_telefone)
            if(!validateTel){
                return res.status(404).json({ message: "Telefone não existe" })
            }
            const idTelefone = await TelefoneModel.updateTelefone(ddd, numero, in_telefone)
            return res.status(201).json(idTelefone)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao atualizar telefone" })
        }
    }

    static async deleteTelefone(req, res){
        const { in_telefone } = req.params
        try {
            const validateTel = await TelefoneModel.getByTelefoneId(in_telefone)
            if(!validateTel){
                return res.status(404).json({message: "Telefone não existe"});
            }
            await TelefoneModel.deleteTelefone(in_telefone)
            return res.status(200).json({message: "Telefone Excluido"})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao excluir telefone' });
        }
    }

    static async getByTelefoneId(req, res){
        const { in_telefone } = req.params
        try {
            const telefone = await TelefoneModel.getByTelefoneId(in_telefone)
            res.status(200).json(telefone)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao buscar telefone"})
        }
    }

    static async getAllTelefone(req, res){
        try {
            const telefones = await TelefoneModel.getAllTelefone()
            res.status(200).json(telefones)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao buscar telefones"})
        }
    }
}


module.exports = TelefoneController