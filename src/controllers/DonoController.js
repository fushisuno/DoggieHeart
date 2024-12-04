const DonoModel = require('../models/Dono');

class DonoController {
    static async createDono(req, res) {
        const { nome, sobrenome, cpf, user_name, email, senha } = req.body;
        try {
            const dono = await DonoModel.createDono(nome, sobrenome, cpf, user_name, email, senha);
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o dono' });
        }
    }

    static async updateDono(req, res) {
        const { in_dono } = req.params;
        const { nome, sobrenome, cpf, in_endereco, in_telefone, user_name, email, senha, avatar } = req.body;
        try {
            const existingDono = await DonoModel.getByDonoId(in_dono);
            if (!existingDono) {
                return res.status(404).json({ message: "Dono não existe" });
            }
            const dono = await DonoModel.updateDono(nome, sobrenome, cpf, in_endereco, in_telefone, user_name, email, senha, avatar, in_dono);
            return res.status(200).json(dono);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar o dono' });
        }
    }

    static async deleteDono(req, res) {
        const { in_dono } = req.params;
        try {
            if (!await DonoModel.getByDonoId(in_dono)) {
                return res.status(404).json({ message: "Dono não existe" });
            }
            await DonoModel.deleteDono(in_dono);
            return res.status(200).json({ message: "Dono excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao excluir o dono' });
        }
    }

    static async getByDonoId(req, res) {
        const { in_dono } = req.params;
        try {
            const dono = await DonoModel.getByDonoId(in_dono);
            if (!dono) {
                return res.status(404).json({ message: "Dono não existe" });
            }
            return res.status(200).json(dono);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar o dono' });
        }
    }

    static async getAllDono(req, res) {
        try {
            const donos = await DonoModel.getAllDono();
            res.render('./pages/donos', { donos }); // Renderização de uma página
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar donos' });
        }
    }

    static async getAllDonoJson(req, res) {
        try {
            const donos = await DonoModel.getAllDono();
            res.json(donos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar donos' });
        }
    }
}

module.exports = DonoController;