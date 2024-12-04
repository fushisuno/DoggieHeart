const db = require('../config/db');

class Veterinario {
    static async createVeterinario(nome, sobrenome, crmv, especialidade, in_veterinaria, email, avatar) {
        const query = await db`
            INSERT INTO Veterinario(nome, sobrenome, crmv, especialidade, in_veterinaria, email, avatar)
            VALUES(${nome}, ${sobrenome}, ${crmv}, ${especialidade}, ${in_veterinaria},${email}, ${avatar})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir veterinária");
        });
        return query[0];
    }

    static async updateVeterinario(nome, sobrenome, in_endereco, in_telefone, especialidade, in_veterinaria, email, senha, avatar, in_veterinario) {
        const query = await db`
            UPDATE Veterinario
            SET
                nome = ${nome},
                sobrenome = ${sobrenome},
                crmv = ${crmv},
                in_endereco = ${in_endereco},
                in_telefone = ${in_telefone},
                especialidade = ${especialidade},
                in_veterinaria = ${in_veterinaria},
                email = ${email},
                avatar = ${avatar}
            WHERE in_Veterinario = ${in_veterinario}
            RETURNING in_Veterinario
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar veterinária");
        });
        return query[0];
    }

    static async deleteVeterinario(in_veterinario) {
        const query = await db`
            DELETE FROM Veterinario
            WHERE in_Veterinario = ${in_veterinario}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir veterinária");
        });
    }

    static async getByVeterinarioId(in_veterinario) {
        const query = await db`
            SELECT * FROM Veterinario
            WHERE in_Veterinario = ${in_veterinario}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar veterinária");
        });
        return query[0];
    }

    static async getAllVeterinario() {
        const query = await db`
            SELECT * FROM Veterinario
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar todas as veterinárias");
        });
        return query;
    }
}

module.exports = Veterinario;