const EnderecoModel = require('../models/Endereco')

class EnderecoController{
    static async createEndereco(req, res){
        const {codigo_postal, cidade, rua, numero_residencia, bairro, complemento, uf} = req.body
        try {
            const idEndereco = await EnderecoModel.createEndereco(codigo_postal, cidade, rua, numero_residencia, bairro, complemento, uf)
            return res.status(201).json(idEndereco);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o endereco' });
        }

    }

    static async updateEndereco(req, res){
        const { in_endereco } = req.params
        const { cidade, rua, numero_residencia, bairro, complemento, uf } = req.body
        try {
            const valid_endereco = await EnderecoModel.getByEnderecoId(in_endereco)
            if(!valid_endereco){
                return res.status(404).json({message: "Endereço não existe"});
            }
            const endereco = await EnderecoModel.updateEndereco(cidade, rua, numero_residencia, bairro, complemento, uf, in_endereco)
            return res.status(201).json(req.body);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar o endereco' });
        }

    }

    static async deleteEndereco(req, res){
        const { in_endereco } = req.params
        try {
            const validateEnd = await EnderecoModel.getByEnderecoId(in_endereco)
            if(!validateEnd){
                return res.status(404).json({message: "Endereço não existe"});
            }
            await EnderecoModel.deleteEndereco(in_endereco)
            return res.status(200).json({message: "Endereço excluido"})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o endereco' });
        }
    }

    static async getByEnderecoId(req, res){
        const { in_endereco } = req.params
        try{
            const endereco = await EnderecoModel.getByEnderecoId(in_endereco)
            return res.status(200).json(endereco)
        }catch(error){
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o endereco' });
        }
    }

    static async getAllEndereco(req, res){
        try {
            const enderecos = await EnderecoModel.getAllEndereco()
            return res.status(200).json({endereços: enderecos})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }
}


module.exports = EnderecoController