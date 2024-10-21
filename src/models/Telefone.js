const db = require('../config/db');

class Telefone {
    static async createTelefone(ddd, numero) {
        const query = await db`
            INSERT INTO Telefone(ddd, numero)
            VALUES(${ddd}, ${numero})
            RETURNING in_telefone
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um telefone");
        });
        return query[0];
    }

    static async updateTelefone(ddd, numero, in_telefone) {
        const query = await db`
            UPDATE Telefone SET
                ddd = ${ddd},
                numero = ${numero}
            WHERE in_telefone = ${in_telefone}
            RETURNING in_telefone
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um telefone");
        });
        return query[0];
    }

    static async deleteTelefone(in_telefone) {
        const query = await db`
            DELETE FROM Telefone
            WHERE in_telefone = ${in_telefone}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir telefone");
        });
    }

    static async getByTelefoneId(in_telefone) {
        const query = await db`
            SELECT * FROM Telefone
            WHERE in_telefone = ${in_telefone}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar telefone");
        });
        return query[0];
    }

    static async getAllTelefone() {
        const query = await db`SELECT * FROM Telefone`.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar todos os telefones");
        });
        return query;
    }
}

module.exports = Telefone;