const db = require('../config/db')

class Vacina {
    static async createVacina(nome, data_vacinacao, proxima_dose, observacoes) {
        const query = await db`
        INSERT INTO Vacina(nome, data_vacinacao, proxima_dose, observacoes)
        VALUES(${nome}, ${data_vacinacao}, ${proxima_dose}, ${observacoes})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir uma nova vacina");
        });

        return query[0];
    }

    static async updateVacina(nome, data_vacinacao, proxima_dose, observacoes, in_vacina) {
        const query = await db`
        UPDATE Vacina
        SET
            nome = ${nome},
            data_vacinacao = ${data_vacinacao},
            proxima_dose = ${proxima_dose},
            observacoes = ${observacoes}
        WHERE in_vacina = ${in_vacina}
        RETURNING in_vacina
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar uma vacina");
        });

        return query[0];
    }

    static async deleteVacina(in_vacina) {
        const query = await db`
        DELETE FROM Vacina
        WHERE in_vacina = ${in_vacina}
        `;
        return query;
    }

    static async getByVacinaId(in_vacina) {
        const query = await db`
        SELECT * FROM Vacina
        WHERE in_vacina = ${in_vacina}
        `;
        return query[0];
    }

    static async getAllVacinas() {
        const query = await db`SELECT * FROM Vacina`;
        return query;
    }
}

module.exports = Vacina;