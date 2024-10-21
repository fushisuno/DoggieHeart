const ProntuarioModel = require('../models/Prontuario');

class ProntuarioController {
    static async createProntuario(req, res) {
        const { in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes } = req.body;
        try {
            const prontuario = await ProntuarioModel.createProntuario(in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes);
            res.status(201).json(prontuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar prontuário' });
        }
    }

    static async updateProntuario(req, res) {
        const { in_prontuario } = req.params;
        const { in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes } = req.body;
        try {
            if (!await ProntuarioModel.getByProntuarioId(in_prontuario)) {
                return res.status(404).json({ message: "Prontuário não existe" });
            }
            const prontuario = await ProntuarioModel.updateProntuario(in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes, in_prontuario);
            return res.status(200).json(prontuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar prontuário' });
        }
    }

    static async deleteProntuario(req, res) {
        const { in_prontuario } = req.params;
        try {
            if (!await ProntuarioModel.getByProntuarioId(in_prontuario)) {
                return res.status(404).json({ message: "Prontuário não existe" });
            }
            await ProntuarioModel.deleteProntuario(in_prontuario);
            return res.status(200).json({ message: "Prontuário excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar prontuário' });
        }
    }

    static async getByProntuarioId(req, res) {
        const { in_prontuario } = req.params;
        try {
            const prontuario = await ProntuarioModel.getByProntuarioId(in_prontuario);
            if (!prontuario) {
                return res.status(404).json({ message: "Prontuário não existe" });
            }
            return res.status(200).json(prontuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar prontuário' });
        }
    }

    static async getAllProntuarios(req, res) {
        try {
            const prontuarios = await ProntuarioModel.getAllProntuarios();
            res.status(200).json(prontuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar prontuários' });
        }
    }
}

module.exports = ProntuarioController;