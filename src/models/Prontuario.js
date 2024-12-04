class Prontuario {
    
    static async createProntuario(in_animal, data_abertura, historico_medicamento, alergias, condicoes_preexistentes, observacoes, in_veterinario) {
        const query = await db`
        INSERT INTO Prontuario(in_animal, data_abertura, historico_medicamento, alergias, condicoes_preexistentes, observacoes, in_veterinario)
        VALUES(${in_animal}, ${data_abertura}, ${historico_medicamento}, ${alergias}, ${condicoes_preexistentes}, ${observacoes}, ${in_veterinario})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo prontuário");
        });

        return query[0];
    }
    
    static async updateProntuario(data_abertura, historico_medicamento, alergias, condicoes_preexistentes, observacoes, in_veterinario, in_prontuario) {
        const query = await db`
        UPDATE Prontuario
        SET
            data_abertura = ${data_abertura},
            historico_medicamento = ${historico_medicamento},
            alergias = ${alergias},
            condicoes_preexistentes = ${condicoes_preexistentes},
            observacoes = ${observacoes},
            in_veterinario = ${in_veterinario}
            
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