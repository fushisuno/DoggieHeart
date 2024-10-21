const DonoModel = require('../models/Dono')

class DonoController{
    static async createDono(req, res){
        const {nome, email, in_endereco, in_telefone, in_login} = req.body
        try {
            const dono = await DonoModel.createDono(nome, email, in_endereco, in_telefone, in_login)
            res.status(201).json(dono)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o dono' });
        }

    }

    static async updateDono(req, res){
        const { in_dono } = req.params
        const {nome, email, in_endereco, in_telefone, in_login} = req.body
        try {
            if(!await DonoModel.getByDonoId(in_dono)){
                return res.status(404).json({message: "Dono não existe"})
            }
            const dono = await DonoModel.updateDono(nome, email, in_endereco, in_telefone, in_login, in_dono)
            return res.status(201).json(dono)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o usuário' });
        }

    }

    static async deleteDono(req, res){
        const { in_dono } = req.params
        try {
            if(!await DonoModel.getByDonoId(in_dono)){
                return res.status(404).json({message: "Dono não existe"})
            }
            const dono = await DonoModel.deleteDono(in_dono)
            return res.status(201).json({message: "Dono excluido"})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o usuário' });
        }
    }

    static async getByDonoId(req, res){
        const { in_dono } = req.params
        try{
            const dono = await DonoModel.getByDonoId(in_dono)
            if(!dono){
                return res.status(404).json({message: "Dono não existe"})
            }
            return res.status(200).json(dono)
        }catch(error){
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o endereco' });
        }
    }
    

    static async getAllDono(req, res){
        try {
            const donos = await DonoModel.getAllDono()
            res.render('./pages/donos', {donos})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }

    static async getAllDonoJson(req, res){
        try {
            const donos = await DonoModel.getAllDono()
            res.json(donos)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }
}


module.exports = DonoController