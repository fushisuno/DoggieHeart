const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Veterinaria {
    static async createVeterinaria(nome, in_endereco, in_telefone, user_name, email, senha, avatar) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const query = await db`
            INSERT INTO Veterinaria(nome, in_endereco, in_telefone, user_name, email, senha, avatar)
            VALUES(${nome}, ${in_endereco}, ${in_telefone}, ${user_name}, ${email}, ${hashedPassword}, ${avatar})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir veterinária");
        });
        return query[0];
    }

    static async updateVeterinaria(nome, in_endereco, in_telefone, email, senha, avatar, in_veterinaria) {
        const query = await db`
            UPDATE Veterinaria
            SET
                nome = ${nome},
                in_endereco = ${in_endereco},
                in_telefone = ${in_telefone},
                email = ${email}
                senha = ${senha}
                avatar = ${avatar}
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

    static async findByUserNameOrEmail(user_name_or_email) {
        const query = await db`
        SELECT * FROM Veterinaria
        WHERE user_name = ${user_name_or_email} OR email = ${user_name_or_email}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar dono");
        });
        return query[0]
    }
}

module.exports = Veterinaria;