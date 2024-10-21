class Prontuario {
    static async createProntuario(in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes) {
        const query = await db`
        INSERT INTO Prontuario(in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes)
        VALUES(${in_animal}, ${in_vacina}, ${in_medicamento}, ${in_exame}, ${in_consulta}, ${observacoes})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo prontuário");
        });

        return query[0];
    }
    
    static async updateProntuario(in_animal, in_vacina, in_medicamento, in_exame, in_consulta, observacoes, in_prontuario) {
        const query = await db`
        UPDATE Prontuario
        SET
            in_animal = ${in_animal},
            in_vacina = ${in_vacina},
            in_medicamento = ${in_medicamento},
            in_exame = ${in_exame},
            in_consulta = ${in_consulta},
            observacoes = ${observacoes}
        WHERE in_prontuario = ${in_prontuario}
        RETURNING in_prontuario
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um prontuário");
        });

        return query[0];
    }

    static async deleteProntuario(in_prontuario) {
        const query = await db`
        DELETE FROM Prontuario
        WHERE in_prontuario = ${in_prontuario}
        `;
        return query;
    }

    static async getByProntuarioId(in_prontuario) {
        const query = await db`
        SELECT * FROM Prontuario
        WHERE in_prontuario = ${in_prontuario}
        `;
        return query[0];
    }

    static async getAllProntuarios() {
        const query = await db`SELECT * FROM Prontuario`;
        return query;
    }
}

module.exports = Prontuario;