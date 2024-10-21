const DocumentoModel = require('../models/Documento');

class DocumentoController {
    static async createDocumento(req, res) {
        const { tipo_documento, arquivo } = req.body;
        try {
            const documento = await DocumentoModel.createDocumento(tipo_documento, arquivo);
            res.status(201).json(documento);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar documento' });
        }
    }

    static async updateDocumento(req, res) {
        const { in_documento } = req.params;
        const { tipo_documento, arquivo } = req.body;
        try {
            if (!await DocumentoModel.getByDocumentoId(in_documento)) {
                return res.status(404).json({ message: "Documento não existe" });
            }
            const documento = await DocumentoModel.updateDocumento(tipo_documento, arquivo, in_documento);
            return res.status(200).json(documento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar documento' });
        }
    }

    static async deleteDocumento(req, res) {
        const { in_documento } = req.params;
        try {
            if (!await DocumentoModel.getByDocumentoId(in_documento)) {
                return res.status(404).json({ message: "Documento não existe" });
            }
            await DocumentoModel.deleteDocumento(in_documento);
            return res.status(200).json({ message: "Documento excluído" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar documento' });
        }
    }

    static async getByDocumentoId(req, res) {
        const { in_documento } = req.params;
        try {
            const documento = await DocumentoModel.getByDocumentoId(in_documento);
            if (!documento) {
                return res.status(404).json({ message: "Documento não existe" });
            }
            return res.status(200).json(documento);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar documento' });
        }
    }

    static async getAllDocumentos(req, res) {
        try {
            const documentos = await DocumentoModel.getAllDocumentos();
            res.status(200).json(documentos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar documentos' });
        }
    }
}

module.exports = DocumentoController;