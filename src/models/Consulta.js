class Consulta {
    static async createConsulta(data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario) {
        const query = await db`
        INSERT INTO Consulta(data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario)
        VALUES(${data_hora}, ${motivo}, ${tipo}, ${status}, ${historico}, ${observacoes}, ${in_animal}, ${in_veterinario})
        RETURNING *
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao inserir uma nova consulta");
        });

        return query[0];
    }
    
    static async updateConsulta(data_hora, motivo, tipo, status, historico, observacoes, in_animal, in_veterinario, in_consulta) {
        const query = await db`
        UPDATE Consulta
        SET
            data_hora = ${data_hora},
            motivo = ${motivo},
            tipo = ${tipo},
            status = ${status},
            historico = ${historico},
            observacoes = ${observacoes},
            in_animal = ${in_animal},
            in_veterinario = ${in_veterinario}
            
        WHERE in_consulta = ${in_consulta}
        RETURNING in_consulta
        `.catch(error => {
            console.error(error);
            throw new Error("Erro interno ao atualizar uma consulta");
        });

        return query[0];
    }

    static async deleteConsulta(in_consulta) {
        const query = await db`
        DELETE FROM Consulta
        WHERE in_consulta = ${in_consulta}
        `;
        return query;
    }

    static async getByConsultaId(in_consulta) {
        const query = await db`
        SELECT * FROM Consulta
        WHERE in_consulta = ${in_consulta}
        `;
        return query[0];
    }

    static async getAllConsultasAnimal(in_animal, in_veterinario) {
        const query = await db`
        SELECT c.in_consulta, c.data_hora, c.motivo, c.tipo, c.status, c.historico, c.observacoes, a.nome, v.nome
        FROM Consulta c
        JOIN Animal a ON c.in_animal = a.in_animal
        JOIN Veterinario v ON c.in_veterinario = v.in_veterinario
        WHERE a.in_animal = ${in_animal} AND v.in_veterinario = ${in_veterinario}
        `;
        return query;
    }
}

module.exports = Consulta;