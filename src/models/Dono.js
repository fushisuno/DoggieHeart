const db = require('../config/db')

class Dono{
    
    static async createDono(nome, email, in_endereço, in_telefone, in_login){
        const query = db``
    }

    static async getAllDono(){
        const query = await db`SELECT * FROM Dono`
        return query
    }

    static async getByDonoId(){

    }
}

module.exports = Dono