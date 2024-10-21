const db = require('../config/db');

class Animal {
    static async createAnimal(nome, raca, idade, in_dono, in_veterinaria) {
        const query = await db`
            INSERT INTO Animal(nome, raca, idade, in_dono, in_veterinaria)
            VALUES(${nome}, ${raca}, ${idade}, ${in_dono}, ${in_veterinaria})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo animal");
        });
        return query[0];
    }

    static async updateAnimal(nome, raca, idade, in_dono, in_veterinaria, in_animal) {
        const query = await db`
            UPDATE Animal
            SET
                nome = ${nome},
                raca = ${raca},
                idade = ${idade},
                in_dono = ${in_dono},
                in_veterinaria = ${in_veterinaria}
            WHERE in_animal = ${in_animal}
            RETURNING in_animal
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar um animal");
        });
        return query[0];
    }

    static async deleteAnimal(in_animal) {
        const query = await db`
            DELETE FROM Animal
            WHERE in_animal = ${in_animal}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir um animal");
        });
        return query;
    }

    static async getByAnimalId(in_animal) {
        const query = await db`
            SELECT * FROM Animal
            WHERE in_animal = ${in_animal}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao buscar animal");
        });
        return query[0];
    }

    static async getAllAnimal() {
        const query = await db`SELECT * FROM Animal`.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao buscar todos os animais");
        });
        return query;
    }
}

module.exports = Animal;