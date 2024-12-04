const db = require('../config/db');

class Vacina {
    static async createVacina(nome, ultima_aplicacao, proxima_dose, descricao, in_animal, in_veterinario) {
        const query = await db`
        INSERT INTO Vacina(nome, ultima_aplicacao, proxima_dose, descricao, in_animal, in_veterinario)
        VALUES(${nome}, ${ultima_aplicacao}, ${proxima_dose}, ${descricao}, ${in_animal}, ${in_veterinario})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir uma nova vacina");
        });

        return query[0];
    }

    static async updateVacina(nome, ultima_aplicacao, proxima_dose, descricao, in_animal, in_veterinario, in_vacina) {
        const query = await db`
        UPDATE Vacina
        SET
            nome = ${nome},
            ultima_aplicacao = ${ultima_aplicacao},
            proxima_dose = ${proxima_dose},
            descricao = ${descricao},
            in_animal = ${in_animal},
            in_veterinario = ${in_veterinario}
            
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