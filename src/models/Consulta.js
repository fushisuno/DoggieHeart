class Consulta {
    static async createConsulta(data_consulta, motivo, recomendacoes) {
        const query = await db`
        INSERT INTO Consulta(data_consulta, motivo, recomendacoes)
        VALUES(${data_consulta}, ${motivo}, ${recomendacoes})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir uma nova consulta");
        });

        return query[0];
    }
    
    static async updateConsulta(data_consulta, motivo, recomendacoes, in_consulta) {
        const query = await db`
        UPDATE Consulta
        SET
            data_consulta = ${data_consulta},
            motivo = ${motivo},
            recomendacoes = ${recomendacoes}
        WHERE in_consulta = ${in_consulta}
        RETURNING in_consulta
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar uma consulta");
        });

        return query[0];
    }

    static async deleteConsulta(in_consulta) {
        const query = await db`
        DELETE FROM Consulta
        WHERE in_consulta = ${in_consulta}
        `;
        return query;
    }

    static async getByConsultaId(in_consulta) {
        const query = await db`
        SELECT * FROM Consulta
        WHERE in_consulta = ${in_consulta}
        `;
        return query[0];
    }

    static async getAllConsultas() {
        const query = await db`SELECT * FROM Consulta`;
        return query;
    }
}

module.exports = Consulta;