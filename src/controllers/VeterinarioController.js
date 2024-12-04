const VeterinarioModel = require('../models/Veterinario');

class VeterinarioController {
    static async createVeterinario(req, res) {
        const { nome, sobrenome, crmv, especialidade, in_veterinaria, email, avatar } = req.body; // Os dados a serem criados
        try {
            const veterinario = await VeterinarioModel.createVeterinario(nome, sobrenome, crmv, especialidade, in_veterinaria, email, avatar);
            return res.status(201).json(veterinario); // Retorna o veterinário criado com status 201 (Criado)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao inserir veterinário" }); // Erro interno do servidor
        }
    }

    static async updateVeterinario(req, res) {
        const { in_veterinario } = req.params; // ID do veterinário a ser atualizado
        const { nome, sobrenome, in_endereco, in_telefone, especialidade, in_veterinaria, email, senha, avatar } = req.body; // Dados para atualizar
        try {
            const validateVet = await VeterinarioModel.getByVeterinarioId(in_veterinario); // Verifica se o veterinário existe
            if (!validateVet) {
                return res.status(404).json({ message: "Veterinário não existe" }); // Retorna 404 se o veterinário não for encontrado
            }
            const updatedVeterinario = await VeterinarioModel.updateVeterinario(nome, sobrenome, in_endereco, in_telefone, especialidade, in_veterinaria, email, senha, avatar, in_veterinario);
            return res.status(200).json(updatedVeterinario); // Retorna o veterinário atualizado com status 200 (OK)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar veterinário" }); // Erro interno do servidor
        }
    }

    static async deleteVeterinario(req, res) {
        const { in_veterinario } = req.params; // ID do veterinário a ser excluído
        try {
            const validateVet = await VeterinarioModel.getByVeterinarioId(in_veterinario); // Verifica se o veterinário existe
            if (!validateVet) {
                return res.status(404).json({ message: "Veterinário não existe" }); // Retorna 404 se o veterinário não for encontrado
            }
            await VeterinarioModel.deleteVeterinario(in_veterinario);
            return res.status(200).json({ message: "Veterinário deletado com sucesso" }); // Sucesso na deleção
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao excluir veterinário" }); // Erro interno do servidor
        }
    }

    static async getByVeterinarioId(req, res) {
        const { in_veterinario } = req.params; // ID do veterinário a ser buscado
        try {
            const veterinario = await VeterinarioModel.getByVeterinarioId(in_veterinario); // Busca veterinário pelo ID
            if (!veterinario) {
                return res.status(404).json({ message: "Veterinário não existe" }); // Retorna 404 se o veterinário não for encontrado
            }
            return res.status(200).json(veterinario); // Retorna o veterinário encontrado com status 200 (OK)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar veterinário" }); // Erro interno do servidor
        }
    }

    static async getAllVeterinario(req, res) {
        try {
            const veterinarios = await VeterinarioModel.getAllVeterinario(); // Busca todos os veterinários
            return res.status(200).json(veterinarios); // Retorna a lista de veterinários com status 200 (OK)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar todos os veterinários" }); // Erro interno do servidor
        }
    }
}

module.exports = VeterinarioController;