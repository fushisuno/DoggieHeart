const db = require('../config/db');

class Endereco {
    static async createEndereco(codigo_postal, cidade, rua, numero_residencia, bairro, complemento, uf) {
        const query = await db`
            INSERT INTO Endereco(codigo_postal, cidade, rua, numero_residencia, bairro, complemento, uf)
            VALUES(${codigo_postal}, ${cidade}, ${rua}, ${numero_residencia}, ${bairro}, ${complemento}, ${uf})
            RETURNING in_endereco
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir endereço");
        });
        return query[0];
    }

    static async updateEndereco(cidade, rua, numero_residencia, bairro, complemento, uf, in_endereco) {
        const query = await db`
            UPDATE Endereco SET
                cidade = ${cidade},
                rua = ${rua},
                numero_residencia = ${numero_residencia},
                bairro = ${bairro},
                complemento = ${complemento},
                uf = ${uf}
            WHERE in_endereco = ${in_endereco}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar endereço");
        });
    }

    static async deleteEndereco(in_endereco) {
        const query = await db`
            DELETE FROM Endereco
            WHERE in_endereco = ${in_endereco}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao excluir endereço");
        });
    }

    static async getByEnderecoId(in_endereco) {
        const query = await db`
            SELECT * FROM Endereco
            WHERE in_endereco = ${in_endereco}
        `.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar endereço");
        });
        return query[0];
    }

    static async getAllEndereco() {
        const query = await db`SELECT * FROM Endereco`.catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar todos os endereços");
        });
        return query;
    }
}

module.exports = Endereco;