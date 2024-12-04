const ConsultaModel = require('../models/Consulta');

class ConsultaController {
    static async createConsulta(req, res) {
        const { data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario } = req.body;
        try {
            const consulta = await ConsultaModel.createConsulta(data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario);
            res.status(201).json(consulta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar consulta' });
        }
    }

    static async updateConsulta(req, res) {
        const { in_consulta } = req.params;
        const { data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario } = req.body;
        try {
            if (!await ConsultaModel.getByConsultaId(in_consulta)) {
                return res.status(404).json({ message: "Consulta não existe" });
            }
            const consulta = await ConsultaModel.updateConsulta(data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario, in_consulta);
            return res.status(200).json(consulta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar consulta' });
        }
    }

    static async deleteConsulta(req, res) {
        const { in_consulta } = req.params;
        try {
            if (!await ConsultaModel.getByConsultaId(in_consulta)) {
                return res.status(404).json({ message: "Consulta não existe" });
            }
            await ConsultaModel.deleteConsulta(in_consulta);
            return res.status(200).json({ message: "Consulta excluída" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar consulta' });
        }
    }

    static async getByConsultaId(req, res) {
        const { in_consulta } = req.params;
        try {
            const consulta = await ConsultaModel.getByConsultaId(in_consulta);
            if (!consulta) {
                return res.status(404).json({ message: "Consulta não existe" });
            }
            return res.status(200).json(consulta);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar consulta' });
        }
    }

    static async getAllConsultas(req, res) {
        try {
            const consultas = await ConsultaModel.getAllConsultas();
            res.status(200).json(consultas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar consultas' });
        }
    }
}

module.exports = ConsultaController;