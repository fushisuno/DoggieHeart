const db = require('../config/db')

class Endereco{
    static async createEndereco(cidade, rua, numero_residencia, bairro, complemento, uf){
        const query = await db`
        INSERT INTO Endereco(cidade, rua, numero_residencia, bairro, complemento, uf)
        VALUES(${cidade}, ${rua}, ${numero_residencia}, ${bairro}, ${complemento}, ${uf})
        `.catch("Erro ao inserir")
    }

    static async getByEnderecoId(in_endereco){
        const query = await db`
        SELECT * FROM Endereco
        WHERE in_endereco = ${in_endereco}
        `
        return query[0]
    }

    static async getAllEndereco(){
        const query = await db`SELECT * FROM Endereco`
        return query
    }
}



module.exports = Endereco