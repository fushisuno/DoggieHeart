const HistoricoSaudeModel = require('../models/HistoricoSaude');

class HistoricoSaudeController {
    static async createHistoricoSaude(req, res) {
        const { data_historico, descricao, in_animal } = req.body;
        try {
            const historico = await HistoricoSaudeModel.createHistoricoSaude(data_historico, descricao, in_animal);
            res.status(201).json(historico);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar histórico de saúde' });
        }
    }

    static async updateHistoricoSaude(req, res) {
        const { in_historico_saude } = req.params;
        const { data_historico, descricao } = req.body;
        try {
            const existingHistorico = await HistoricoSaudeModel.getByHistoricoId(in_historico_saude);
            if (!existingHistorico) {
                return res.status(404).json({ message: "Histórico de saúde não existe" });
            }
            const historico = await HistoricoSaudeModel.updateHistoricoSaude(data_historico, descricao, in_historico_saude);
            return res.status(200).json(historico);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar histórico de saúde' });
        }
    }

    static async deleteHistoricoSaude(req, res) {
        const { in_historico_saude } = req.params;
        try {
            const existingHistorico = await HistoricoSaudeModel.getByHistoricoId(in_historico_saude);
            if (!existingHistorico) {
                return res.status(404).json({ message: "Histórico de saúde não existe" });
            }
            await HistoricoSaudeModel.deleteHistoricoSaude(in_historico_saude);
            return res.status(200).json({ message: "Histórico de saúde excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar histórico de saúde' });
        }
    }

    static async getByHistoricoId(req, res) {
        const { in_historico_saude } = req.params;
        try {
            const historico = await HistoricoSaudeModel.getByHistoricoId(in_historico_saude);
            if (!historico) {
                return res.status(404).json({ message: "Histórico de saúde não existe" });
            }
            return res.status(200).json(historico);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar histórico de saúde' });
        }
    }

    static async getAllHistoricos(req, res) {
        try {
            const historicos = await HistoricoSaudeModel.getAllHistoricos();
            return res.status(200).json(historicos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar históricos de saúde' });
        }
    }
}

module.exports = HistoricoSaudeController;