class Documento {
    static async createDocumento(arquivo, descricao, tipo_documento, data_emissao) {
        const query = await db`
        INSERT INTO Documento(arquivo, descricao, tipo_documento, data_emissao)
        VALUES(${arquivo}, ${descricao}, ${tipo_documento}, ${data_emissao})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo documento");
        });

        return query[0];
    }
    
    static async updateDocumento(arquivo, descricao, tipo_documento, data_emissao, in_documento) {
        const query = await db`
        UPDATE Documento
        SET
            arquivo = ${arquivo},
            descricao = ${descricao},
            tipo_documento = ${tipo_documento},
            data_emissao = ${data_emissao},
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