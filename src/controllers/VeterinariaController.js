const VeterinariaModel = require('../models/Veterinaria')

class VeterinariaController{
    static async createVeterinaria(req, res){
        const { nome, crmv, especialidade, email, in_endereco, in_telefone, in_login } = req.body
        try {
            const veterinaria = await VeterinariaModel.createVeterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login)
            return res.status(201).json(veterinaria)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir Veterinaria"})
        }
    }

    static async updateVeterinaria(req, res){
        const { in_veterinaria } = req.params
        const { nome, crmv, especialidade, email, in_endereco, in_telefone, in_login } = req.body
        try {
            const validateVet = await VeterinariaModel.getByVeterinariaId(in_veterinaria)
            if(!validateVet){
                return res.status(404).json({message: "Veterinaria não existe"})
            }
            const idVeterinaria = await VeterinariaModel.updateVeterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login, in_veterinaria)
            return res.status(201).json(idVeterinaria)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir Veterinaria"})
        }
    } 

    static async deleteVeterinaria(req, res){
        const { in_veterinaria } = req.params
        try {
            const validateVet = await VeterinariaModel.getByVeterinariaId(in_veterinaria)
            if(!validateVet){
                return res.status(404).json({message: "Veterinaria não existe"})
            }
            await VeterinariaModel.deleteVeterinaria(in_veterinaria)
            return res.status(201).json({message: "Veterinaria deletada com sucesso"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir Veterinaria"})
        }
    } 

    static async getByVeterinariaId(req, res){
        const { in_veterinaria } = req.params
        try {
            const veterinaria = await VeterinariaModel.getByVeterinariaId(in_veterinaria)
            if(!veterinaria){
                return res.status(404).json({message: "Veterinaria não existe"})
            }
            return res.status(201).json(veterinaria)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir Veterinaria"})
        }
    }

    static async getAllVeterinaria(req, res){
        try {
            const veterinarias = await VeterinariaModel.getAllVeterinaria()
            return res.status(201).json(veterinarias)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao inserir Veterinaria"})
        }
    }
}

module.exports = VeterinariaController