class HistoricoSaude {
    static async createHistoricoSaude(data_historico, descricao, in_animal) {
        const query = await db`
        INSERT INTO HistoricoSaude(data_historico, descricao, in_animal)
        VALUES(${data_historico}, ${descricao}, ${in_animal})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo histórico de saúde");
        });

        return query[0];
    }

    static async updateHistoricoSaude(data_historico, descricao, in_historico_saude) {
        const query = await db`
        UPDATE HistoricoSaude
        SET
            data_historico = ${data_historico},
            descricao = ${descricao}
            
        WHERE in_historico_saude = ${in_historico_saude}
        RETURNING in_historico_saude
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar o histórico de saúde");
        });

        return query[0];
    }

    static async deleteHistoricoSaude(in_historico_saude) {
        const query = await db`
            DELETE FROM HistoricoSaude
            WHERE in_historico_saude = ${in_historico_saude}
        `;
        return query;
    }

    static async getByHistoricoId(in_historico_saude) {
        const query = await db`
            SELECT * FROM HistoricoSaude
            WHERE in_historico_saude = ${in_historico_saude}
        `;
        return query[0];
    }

    static async getAllHistoricos() {
        const query = await db`SELECT * FROM HistoricoSaude`;
        return query;
    }
}

module.exports = HistoricoSaude;