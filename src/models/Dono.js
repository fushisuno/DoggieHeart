const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Dono {
    static async createDono(nome, sobrenome, cpf, user_name, email, senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const query = await db`
            INSERT INTO Dono(nome, sobrenome, cpf, user_name, email, senha) 
            VALUES(${nome}, ${sobrenome}, ${cpf}, ${user_name}, ${email}, ${hashedPassword})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo dono");
        });
        return query[0];
    }

    static async updateDono(nome, sobrenome, cpf, in_endereco, in_telefone, user_name, email, senha, avatar, in_dono) {
        const query = await db`
            UPDATE Dono
            SET 
                nome = ${nome},
                sobrenome = ${sobrenome},
                cpf = ${cpf},
                in_endereco = ${in_endereco},
                in_telefone = ${in_telefone},
                user_name = ${user_name},
                email = ${email},
                senha = ${senha},
                avatar = ${avatar},
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

    static async findDonoByUserNameOrEmail(user_name_or_email) {
        const query = await db`
        SELECT * FROM Dono
        WHERE user_name = ${user_name_or_email} OR email = ${user_name_or_email}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar dono");
        });
        return query[0]
    }
}

module.exports = Dono;