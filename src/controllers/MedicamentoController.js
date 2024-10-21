const MedicamentoModel = require('../models/Medicamento');

class MedicamentoController {
    static async createMedicamento(req, res) {
        const { nome, dosagem, frequencia, data_inicio, data_fim, observacoes } = req.body;
        try {
            const medicamento = await MedicamentoModel.createMedicamento(nome, dosagem, frequencia, data_inicio, data_fim, observacoes);
            res.status(201).json(medicamento);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar medicamento' });
        }
    }

    static async updateMedicamento(req, res) {
        const { in_medicamento } = req.params;
        const { nome, dosagem, frequencia, data_inicio, data_fim, observacoes } = req.body;
        try {
            if (!await MedicamentoModel.getByMedicamentoId(in_medicamento)) {
                return res.status(404).json({ message: "Medicamento não existe" });
            }
            const medicamento = await MedicamentoModel.updateMedicamento(nome, dosagem, frequencia, data_inicio, data_fim, observacoes, in_medicamento);
            return res.status(200).json(medicamento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar medicamento' });
        }
    }

    static async deleteMedicamento(req, res) {
        const { in_medicamento } = req.params;
        try {
            if (!await MedicamentoModel.getByMedicamentoId(in_medicamento)) {
                return res.status(404).json({ message: "Medicamento não existe" });
            }
            await MedicamentoModel.deleteMedicamento(in_medicamento);
            return res.status(200).json({ message: "Medicamento excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar medicamento' });
        }
    }

    static async getByMedicamentoId(req, res) {
        const { in_medicamento } = req.params;
        try {
            const medicamento = await MedicamentoModel.getByMedicamentoId(in_medicamento);
            if (!medicamento) {
                return res.status(404).json({ message: "Medicamento não existe" });
            }
            return res.status(200).json(medicamento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar medicamento' });
        }
    }

    static async getAllMedicamentos(req, res) {
        try {
            const medicamentos = await MedicamentoModel.getAllMedicamentos();
            res.status(200).json(medicamentos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar medicamentos' });
        }
    }
}

module.exports = MedicamentoController;