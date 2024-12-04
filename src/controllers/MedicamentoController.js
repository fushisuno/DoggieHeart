const ReceitaModel = require('../models/Receita');

class ReceitaController {
    static async createReceita(req, res) {
        const { in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario } = req.body;
        try {
            const receita = await ReceitaModel.createReceita(in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario);
            res.status(201).json(receita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar receita' });
        }
    }

    static async updateReceita(req, res) {
        const { in_receita } = req.params;
        const { in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario } = req.body;
        try {
            const existingReceita = await ReceitaModel.getByReceitaId(in_receita);
            if (!existingReceita) {
                return res.status(404).json({ message: "Receita não existe" });
            }
            const receita = await ReceitaModel.updateReceita(in_receita, in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario);
            return res.status(200).json(receita);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar receita' });
        }
    }

    static async deleteReceita(req, res) {
        const { in_receita } = req.params;
        try {
            const existingReceita = await ReceitaModel.getByReceitaId(in_receita);
            if (!existingReceita) {
                return res.status(404).json({ message: "Receita não existe" });
            }
            await ReceitaModel.deleteReceita(in_receita);
            return res.status(200).json({ message: "Receita excluída" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar receita' });
        }
    }

    static async getByReceitaId(req, res) {
        const { in_receita } = req.params;
        try {
            const receita = await ReceitaModel.getByReceitaId(in_receita);
            if (!receita) {
                return res.status(404).json({ message: "Receita não existe" });
            }
            return res.status(200).json(receita);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar receita' });
        }
    }

    static async getAllReceitas(req, res) {
        try {
            const receitas = await ReceitaModel.getAllReceitas();
            res.status(200).json(receitas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar receitas' });
        }
    }
}

module.exports = ReceitaController;