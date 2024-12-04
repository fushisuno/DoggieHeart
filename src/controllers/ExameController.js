const ExameModel = require('../models/Exame');

class ExameController {
    static async createExame(req, res) {
        const { tipo_exame, data_exame, resultados, in_consulta } = req.body;
        try {
            const exame = await ExameModel.createExame(tipo_exame, data_exame, resultados, in_consulta);
            res.status(201).json(exame);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar exame' });
        }
    }

    static async updateExame(req, res) {
        const { in_exame } = req.params;
        const { tipo_exame, data_exame, resultado } = req.body;
        try {
            const existingExame = await ExameModel.getByExameId(in_exame);
            if (!existingExame) {
                return res.status(404).json({ message: "Exame não existe" });
            }
            const exame = await ExameModel.updateExame(tipo_exame, data_exame, resultado, in_exame);
            return res.status(200).json(exame);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar exame' });
        }
    }

    static async deleteExame(req, res) {
        const { in_exame } = req.params;
        try {
            if (!await ExameModel.getByExameId(in_exame)) {
                return res.status(404).json({ message: "Exame não existe" });
            }
            await ExameModel.deleteExame(in_exame);
            return res.status(200).json({ message: "Exame excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar exame' });
        }
    }

    static async getByExameId(req, res) {
        const { in_exame } = req.params;
        try {
            const exame = await ExameModel.getByExameId(in_exame);
            if (!exame) {
                return res.status(404).json({ message: "Exame não existe" });
            }
            return res.status(200).json(exame);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar exame' });
        }
    }

    static async getAllExames(req, res) {
        try {
            const exames = await ExameModel.getAllExames();
            res.status(200).json(exames);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar exames' });
        }
    }
}

module.exports = ExameController;