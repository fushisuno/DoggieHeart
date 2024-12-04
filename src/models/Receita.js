class Receita {
    static async createReceita(in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario) {
        const query = await db`
        INSERT INTO Receita(in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario)
        VALUES(${in_consulta}, ${medicamento}, ${dosagem}, ${frequencia}, ${duracao}, ${in_veterinario})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir uma nova receita");
        });

        return query[0];
    }
    
    static async updateReceita(in_receita, in_consulta, medicamento, dosagem, frequencia, duracao, in_veterinario) {
        const query = await db`
        UPDATE Receita
        SET
            in_consulta = ${in_consulta},
            medicamento = ${medicamento},
            dosagem = ${dosagem},
            frequencia = ${frequencia},
            duracao = ${duracao},
            in_veterinario = ${in_veterinario}
            
        WHERE in_receita = ${in_receita}
        RETURNING in_receita
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar a receita");
        });

        return query[0];
    }

    static async deleteReceita(in_receita) {
        const query = await db`
        DELETE FROM Receita
        WHERE in_receita = ${in_receita}
        `;
        return query;
    }

    static async getByReceitaId(in_receita) {
        const query = await db`
        SELECT * FROM Receita
        WHERE in_receita = ${in_receita}
        `;
        return query[0];
    }

    static async getAllReceitas() {
        const query = await db`SELECT * FROM Receita`;
        return query;
    }
}

module.exports = Receita;