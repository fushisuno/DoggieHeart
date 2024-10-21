const db = require('../config/db');

class Veterinaria {
    static async createVeterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login) {
        const query = await db`
            INSERT INTO Veterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login)
            VALUES(${nome}, ${crmv}, ${especialidade}, ${email}, ${in_endereco}, ${in_telefone}, ${in_login})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir veterinária");
        });
        return query[0];
    }

    static async updateVeterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login, in_veterinaria) {
        const query = await db`
            UPDATE Veterinaria
            SET
                nome = ${nome},
                crmv = ${crmv},
                especialidade = ${especialidade},
                email = ${email},
                in_endereco = ${in_endereco},
                in_telefone = ${in_telefone},
                in_login = ${in_login}
            WHERE in_veterinaria = ${in_veterinaria}
            RETURNING in_veterinaria
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar veterinária");
        });
        return query[0];
    }

    static async deleteVeterinaria(in_veterinaria) {
        const query = await db`
            DELETE FROM Veterinaria
            WHERE in_veterinaria = ${in_veterinaria}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir veterinária");
        });
    }

    static async getByVeterinariaId(in_veterinaria) {
        const query = await db`
            SELECT * FROM Veterinaria
            WHERE in_veterinaria = ${in_veterinaria}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar veterinária");
        });
        return query[0];
    }

    static async getAllVeterinaria() {
        const query = await db`
            SELECT * FROM Veterinaria
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar todas as veterinárias");
        });
        return query;
    }
}

module.exports = Veterinaria;