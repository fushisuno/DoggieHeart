class Documento {
    static async createDocumento(tipo_documento, arquivo, data_upload = new Date()) {
        const query = await db`
        INSERT INTO Documento(tipo_documento, arquivo, data_upload)
        VALUES(${tipo_documento}, ${arquivo}, ${data_upload})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo documento");
        });

        return query[0];
    }
    
    static async updateDocumento(tipo_documento, arquivo, in_documento) {
        const query = await db`
        UPDATE Documento
        SET
            tipo_documento = ${tipo_documento},
            arquivo = ${arquivo}
        WHERE in_documento = ${in_documento}
        RETURNING in_documento
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um documento");
        });

        return query[0];
    }

    static async deleteDocumento(in_documento) {
        const query = await db`
        DELETE FROM Documento
        WHERE in_documento = ${in_documento}
        `;
        return query;
    }

    static async getByDocumentoId(in_documento) {
        const query = await db`
        SELECT * FROM Documento
        WHERE in_documento = ${in_documento}
        `;
        return query[0];
    }

    static async getAllDocumentos() {
        const query = await db`SELECT * FROM Documento`;
        return query;
    }
}

module.exports = Documento;