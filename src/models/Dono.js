const db = require('../config/db')

class Dono{
    static async createDono(nome, email, in_endereco, in_telefone, in_login){
        const query = await db`
        INSERT INTO Dono(nome, email, in_endereco, in_telefone, in_login) 
        VALUES(${nome}, ${email}, ${in_endereco}, ${in_telefone}, ${in_login})
        RETURNING *
        `
        return query[0]
    }

    static async updateDono(nome, email, in_endereco, in_telefone, in_login, in_dono){
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
        `
        return query[0]
    }

    static async deleteDono(in_dono){
        const query = await db`
        DELETE FROM Dono
        WHERE in_dono = ${in_dono}
        `
        return query[0]
    }

    static async getByDonoId(in_dono){
        const query = await db`
        SELECT * FROM Dono
        WHERE in_dono = ${in_dono}
        `
        return query[0]
    }

    static async getAllDono(){
        const query = await db`SELECT * FROM Dono`
        return query
    }

}

module.exports = Dono