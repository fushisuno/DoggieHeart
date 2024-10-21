const db = require('../config/db');

class Login {
    static async createLogin(user_name, senha) {
        const query = await db`
            INSERT INTO Login(user_name, senha)
            VALUES(${user_name}, ${senha})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir login");
        });
        return query[0];
    }

    static async updateLogin(user_name, senha, in_login) {
        const query = await db`
            UPDATE Login
            SET
                user_name = ${user_name},
                senha = ${senha}
            WHERE in_login = ${in_login}
            RETURNING in_login
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar login");
        });
        return query[0];
    }

    static async deleteLogin(in_login) {
        const query = await db`
            DELETE FROM Login 
            WHERE in_login = ${in_login}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir login");
        });
    }

    static async getByLoginId(in_login) {
        const query = await db`
            SELECT * FROM Login
            WHERE in_login = ${in_login}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar login");
        });
        return query[0];
    }

    static async getAllLogin() {
        const query = await db`
            SELECT * FROM Login
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar todos os logins");
        });
        return query;
    }
}

module.exports = Login;