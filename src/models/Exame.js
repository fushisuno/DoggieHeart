class Exame {
    static async createExame(tipo_exame, data_exame, resultado, observacoes) {
        const query = await db`
        INSERT INTO Exame(tipo_exame, data_exame, resultado, observacoes)
        VALUES(${tipo_exame}, ${data_exame}, ${resultado}, ${observacoes})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo exame");
        });

        return query[0];
    }
    
    static async updateExame(tipo_exame, data_exame, resultado, observacoes, in_exame) {
        const query = await db`
        UPDATE Exame
        SET
            tipo_exame = ${tipo_exame},
            data_exame = ${data_exame},
            resultado = ${resultado},
            observacoes = ${observacoes}
        WHERE in_exame = ${in_exame}
        RETURNING in_exame
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um exame");
        });

        return query[0];
    }

    static async deleteExame(in_exame) {
        const query = await db`
        DELETE FROM Exame
        WHERE in_exame = ${in_exame}
        `;
        return query;
    }

    static async getByExameId(in_exame) {
        const query = await db`
        SELECT * FROM Exame
        WHERE in_exame = ${in_exame}
        `;
        return query[0];
    }

    static async getAllExames() {
        const query = await db`SELECT * FROM Exame`;
        return query;
    }
}

module.exports = Exame;