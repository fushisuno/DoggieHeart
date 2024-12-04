const VeterinariaModel = require('../models/Veterinaria');

const EnderecoController = require('../controllers/EnderecoController')
const TelefoneController = require('../controllers/TelefoneController')

class VeterinariaController {
    static async createVeterinaria(req, res) {
        const { codigo_postal, cidade, rua, numero_residencia, bairro, complemento, uf} = req.body;
        const { ddd, numero} = req.body
        const { nome, user_name, email, senha } = req.body;
        try {
            const Endereco = await EnderecoController.createEndereco(codigo_postal, cidade, rua, numero_residencia, bairro, complemento, uf)
            const Telefone = await TelefoneController.createTelefone(ddd, numero)
            const veterinaria = await VeterinariaModel.createVeterinaria(nome, Endereco.in_endereco, Telefone.in_telefone, user_name, email, senha, null);
            res.redirect(`/send-email/veterinaria/:${veterinaria.nome}/:${veterinaria.email}/:${senha}`)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao inserir veterinária" });
        }
    }

    static async updateVeterinaria(req, res) {
        const { in_veterinaria } = req.params;
        const { nome, in_endereco, in_telefone, email, senha, avatar } = req.body;
        try {
            const validateVet = await VeterinariaModel.getByVeterinariaId(in_veterinaria);
            if (!validateVet) {
                return res.status(404).json({ message: "Veterinária não existe" });
            }
            const updatedVeterinaria = await VeterinariaModel.updateVeterinaria(nome, in_endereco, in_telefone, email, senha, avatar, in_veterinaria);
            return res.status(200).json(updatedVeterinaria);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar veterinária" });
        }
    }

    static async deleteVeterinaria(req, res) {
        const { in_veterinaria } = req.params;
        try {
            const validateVet = await VeterinariaModel.getByVeterinariaId(in_veterinaria);
            if (!validateVet) {
                return res.status(404).json({ message: "Veterinária não existe" });
            }
            await VeterinariaModel.deleteVeterinaria(in_veterinaria);
            return res.status(200).json({ message: "Veterinária deletada com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar veterinária" });
        }
    }

    static async getByVeterinariaId(req, res) {
        const { in_veterinaria } = req.params;
        try {
            const veterinaria = await VeterinariaModel.getByVeterinariaId(in_veterinaria);
            if (!veterinaria) {
                return res.status(404).json({ message: "Veterinária não existe" });
            }
            return res.status(200).json(veterinaria);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar veterinária" });
        }
    }

    static async getAllVeterinaria(req, res) {
        try {
            const veterinarias = await VeterinariaModel.getAllVeterinaria();
            return res.status(200).json(veterinarias);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar todas as veterinárias" });
        }
    }
}

module.exports = VeterinariaController;