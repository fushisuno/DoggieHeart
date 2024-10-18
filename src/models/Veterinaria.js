const db = require('../config/db')

class Veterinaria{
    static async createVeterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login){
        const query = await db`
        INSERT INTO Veterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login)
        VALUES(${nome},${crmv},${especialidade},${email},${in_endereco},${in_telefone},${in_login})
        RETURNING *
        `.catch("Erro ao inserir veterinaria")

        return query[0]
    }

    static async updateVeterinaria(nome, crmv, especialidade, email, in_endereco, in_telefone, in_login, in_veterinaria){
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
        `.catch("Erro ao atualizar veterinaria")

        return query[0]
    }

    static async deleteVeterinaria(in_veterinaria){
        const query = await db`
        DELETE FROM Veterinaria
        WHERE in_veterinaria = ${in_veterinaria}
        `.catch("Erro interno ao excluir veterinaria")
    }

    static async getByVeterinariaId(in_veterinaria){
        const query = await db`
        SELECT * FROM Veterinaria
        WHERE in_veterinaria = ${in_veterinaria}
        `
        return query[0]
    }

    static async getAllVeterinaria(){
        const query = await db`
        SELECT * FROM Veterinaria
        `
        return query
    }
}

module.exports = Veterinaria