const db = require('../config/db');

class Dono {
    static async createDono(nome, email, in_endereco, in_telefone, in_login) {
        const query = await db`
            INSERT INTO Dono(nome, email, in_endereco, in_telefone, in_login) 
            VALUES(${nome}, ${email}, ${in_endereco}, ${in_telefone}, ${in_login})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo dono");
        });
        return query[0];
    }

    static async updateDono(nome, email, in_endereco, in_telefone, in_login, in_dono) {
        const query = await db`
            UPDATE Dono
            SET 
                nome = ${nome},
                email = ${email},
                in_endereco = ${in_endereco},
                in_telefone = ${in_telefone},
                in_login = ${in_login}
            WHERE in_dono = ${in_dono}
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um dono");
        });
        return query[0];
    }

    static async deleteDono(in_dono) {
        const query = await db`
            DELETE FROM Dono
            WHERE in_dono = ${in_dono}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir um dono");
        });
        return query;
    }

    static async getByDonoId(in_dono) {
        const query = await db`
            SELECT * FROM Dono
            WHERE in_dono = ${in_dono}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar dono");
        });
        return query[0];
    }

    static async getAllDono() {
        const query = await db`SELECT * FROM Dono`.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar todos os donos");
        });
        return query;
    }
}

module.exports = Dono;