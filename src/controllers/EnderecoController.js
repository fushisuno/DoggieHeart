const EnderecoModel = require('../models/Endereco')

class EnderecoController{
    static async createEndereco(req, res){
        const {cidade, rua, numero_residencia, bairro, complemento, uf} = req.body
        try {
            const endereco = await EnderecoModel.createEndereco(cidade, rua, numero_residencia, bairro, complemento, uf)
            res.status(201).json(endereco);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o endereco' });
        }

    }

    static async getByEnderecoId(req, res){
        const { in_endereco } = req.params
        try{
            const endereco = await EnderecoModel.getByEnderecoId(in_endereco)
            res.status(200).json(endereco)
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o endereco' });
        }
    }

    static async getAllEndereco(req, res){
        try {
            const enderecos = await EnderecoModel.getAllEndereco()
            res.status(200).json({endereços: enderecos})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }
}


module.exports = EnderecoController