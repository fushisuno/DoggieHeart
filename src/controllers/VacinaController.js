const VacinaModel = require('../models/Vacina');

class VacinaController {
    static async createVacina(req, res) {
        const { nome, data_vacinacao, proxima_dose, observacoes } = req.body;
        try {
            const vacina = await VacinaModel.createVacina(nome, data_vacinacao, proxima_dose, observacoes);
            res.status(201).json(vacina);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar vacina' });
        }
    }

    static async updateVacina(req, res) {
        const { in_vacina } = req.params;
        const { nome, data_vacinacao, proxima_dose, observacoes } = req.body;
        try {
            if (!await VacinaModel.getByVacinaId(in_vacina)) {
                return res.status(404).json({ message: "Vacina não existe" });
            }
            const vacina = await VacinaModel.updateVacina(nome, data_vacinacao, proxima_dose, observacoes, in_vacina);
            return res.status(200).json(vacina);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar vacina' });
        }
    }

    static async deleteVacina(req, res) {
        const { in_vacina } = req.params;
        try {
            if (!await VacinaModel.getByVacinaId(in_vacina)) {
                return res.status(404).json({ message: "Vacina não existe" });
            }
            await VacinaModel.deleteVacina(in_vacina);
            return res.status(200).json({ message: "Vacina excluída" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar vacina' });
        }
    }

    static async getByVacinaId(req, res) {
        const { in_vacina } = req.params;
        try {
            const vacina = await VacinaModel.getByVacinaId(in_vacina);
            if (!vacina) {
                return res.status(404).json({ message: "Vacina não existe" });
            }
            return res.status(200).json(vacina);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar vacina' });
        }
    }

    static async getAllVacinas(req, res) {
        try {
            const vacinas = await VacinaModel.getAllVacinas();
            res.status(200).json(vacinas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar vacinas' });
        }
    }
}

module.exports = VacinaController;