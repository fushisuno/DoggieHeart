const sql = require('../config/db');
const db = require('../config/db');

class Animal {
    static async createAnimal(nome, especie, raca, idade, sexo, peso, foto, in_dono, in_veterinaria) {
        const query = await db`
            INSERT INTO Animal(nome, especie, raca, idade, sexo, peso, foto, in_dono, in_veterinaria)
            VALUES(${nome}, ${especie}, ${raca}, ${idade}, ${sexo}, ${peso}, ${foto}, ${in_dono}, ${in_veterinaria})
            RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir um novo animal");
        });
        return query[0];
    }

    static async updateAnimal(nome, especie, raca, idade, sexo, peso, foto, in_dono, in_veterinaria, in_animal) {
        const query = await db`
            UPDATE Animal
            SET
                nome = ${nome},
                especie = ${especie},
                raca = ${raca},
                idade = ${idade},
                sexo = ${sexo},
                peso = ${peso},
                foto = ${foto},
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

    static async getAllAnimal(in_dono) {
        const query = await db`SELECT * FROM Animal WHERE in_dono = ${in_dono};`.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao buscar todos os animais");
        });
        return query;
    }

    static async getAllAnimalDono(in_dono) {
        const query = await db`
        SELECT * FROM Animal as a 
        JOIN Dono as d 
        ON a.in_dono = d.in_dono
        WHERE a.in_dono = ${in_dono}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao buscar todos os animais");
        });
        return query;
    }
    static async getImageAnimalId(in_animal){
        const query = await sql`
        SELECT foto FROM Animal
        WHERE in_animal = ${in_animal}`.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao buscar foto do animal");
        });
        return query[0];
    }
}

module.exports = Animal;