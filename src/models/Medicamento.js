class Medicamento {
    static async createMedicamento(nome, dosagem, frequencia, data_inicio, data_fim, observacoes) {
        const query = await db`
        INSERT INTO Medicamento(nome, dosagem, frequencia, data_inicio, data_fim, observacoes)
        VALUES(${nome}, ${dosagem}, ${frequencia}, ${data_inicio}, ${data_fim}, ${observacoes})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo medicamento");
        });

        return query[0];
    }
    
    static async updateMedicamento(nome, dosagem, frequencia, data_inicio, data_fim, observacoes, in_medicamento) {
        const query = await db`
        UPDATE Medicamento
        SET
            nome = ${nome},
            dosagem = ${dosagem},
            frequencia = ${frequencia},
            data_inicio = ${data_inicio},
            data_fim = ${data_fim},
            observacoes = ${observacoes}
        WHERE in_medicamento = ${in_medicamento}
        RETURNING in_medicamento
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um medicamento");
        });

        return query[0];
    }

    static async deleteMedicamento(in_medicamento) {
        const query = await db`
        DELETE FROM Medicamento
        WHERE in_medicamento = ${in_medicamento}
        `;
        return query;
    }

    static async getByMedicamentoId(in_medicamento) {
        const query = await db`
        SELECT * FROM Medicamento
        WHERE in_medicamento = ${in_medicamento}
        `;
        return query[0];
    }

    static async getAllMedicamentos() {
        const query = await db`SELECT * FROM Medicamento`;
        return query;
    }
}

module.exports = Medicamento;