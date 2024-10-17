const db = require('../config/db')

class Login{
    static async createLogin(user_name, senha){
        const query = await db`
        INSERT INTO Login(user_name, senha)
        VALUES(${user_name}, ${senha})
        RETURNING *
        `.catch("Erro ao inserir login")
        return query[0]
    }

    static async updateLogin(user_name, senha, in_login){
        const query = await db`
        UPDATE Login
        SET
            user_name = ${user_name},
            senha = ${senha}
        WHERE in_login = ${in_login}
        RETURNING in_login;
        `
        return query[0]
    }

    static async deleteLogin(in_login){
        const query = await db`
        DELETE FROM Login 
        WHERE in_login = ${in_login}
        `.catch("Erro ao excluir login")
    }

    static async getByLoginId(in_login){
        const query = await db`
        SELECT * FROM Login
        WHERE in_login = ${in_login}
        `.catch("Erro ao buscar login")
        return query[0]
    }

    static async getAllLogin(in_login){
        const query = await db`
        SELECT * FROM Login
        `.catch("Erro ao buscar login")
        return query
    }

}


module.exports = Login