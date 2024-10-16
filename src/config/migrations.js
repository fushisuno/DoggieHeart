const { error } = require('console')
const db = require('./db')

const createTesteTable = async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS teste(
    id serial PRIMARY KEY,
    teste varchar(255),
    nome varchar(200) 
    );`.catch(console.log(error))
}

const createEnderecoTable = async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Endereco(
    in_endereco SERIAL PRIMARY KEY,
    cidade VARCHAR(200) NOT NULL,
    rua VARCHAR(200) NOT NULL,
    numero_residencia INT NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    complemento VARCHAR(200) NOT NULL,
    uf VARCHAR(2) NOT NULL
    );`.catch(console.log(error))
}

const createTelefoneTable = async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Telefone(
    in_telefone SERIAL PRIMARY KEY,
    ddd SMALLINT NOT NULL,
    numero VARCHAR(20) NOT NULL
    );`.catch(console.log(error))
}

const createLoginTable = async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Login(
    in_login SERIAL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    senha VARCHAR(200) NOT NULL,
    avatar BYTEA,
    data_cadastro DATE DEFAULT NOW()
    );`.catch(console.log(error))
}

const createDonoTable = async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Dono (
    in_dono SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    in_endereco INT REFERENCES Endereco(in_endereco),
    in_telefone INT REFERENCES Telefone(in_telefone),
    in_login INT REFERENCES Login(in_login)
    );`.catch(console.log(error))
}

const createVeterinariaTable =async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Veterinaria (
    in_veterinaria SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    crmv VARCHAR(30) UNIQUE NOT NULL,
    especialidade VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    in_telefone INT REFERENCES Telefone(in_telefone),
    in_endereco INT REFERENCES Endereco(in_endereco),
    in_login INT REFERENCES Login(in_login)
    );`.then(console.log('Criou Veterina')).catch(console.log(error))
}

const createAnimalTable =async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Animal (
    in_animal SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    raca VARCHAR(100),
    idade INT CHECK (idade >= 0),
    in_dono INT REFERENCES Dono(in_dono),
    in_veterinaria INT REFERENCES Veterinaria(in_veterinaria)
    );`.then(console.log('Criou An')).catch(console.log(error))
}

const createVacinaTable =async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Vacina (
    in_vacina SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_vacinacao DATE NOT NULL,
    proxima_dose DATE,
    observacoes TEXT
    );`.then(console.log('Criou Vc')).catch(console.log(error))
}

const createMedicamentoTable =async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Medicamento (
    in_medicamento SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    dosagem VARCHAR(100),
    frequencia VARCHAR(100),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    observacoes TEXT
    );`.then(console.log('Criou Md')).catch(console.log(error))
}

const createConsultaTable =async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Consulta (
    in_consulta SERIAL PRIMARY KEY,
    data_consulta DATE NOT NULL,
    motivo TEXT NOT NULL,
    recomendacoes TEXT
    );`.then(console.log('Criou Cs')).catch(console.log(error))
}

const createExameTable =async () =>{
    const query = await db`
    CREATE TABLE Exame (
    in_exame SERIAL PRIMARY KEY,
    tipo_exame VARCHAR(255) NOT NULL,
    data_exame DATE NOT NULL,
    resultado TEXT NOT NULL,
    observacoes TEXT
    );`.then(console.log('Criou Ex')).catch(console.log(error))
}

const createDocumentoTable =async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Documento (
    in_documento SERIAL PRIMARY KEY,
    tipo_documento VARCHAR(255) NOT NULL,
    arquivo BYTEA NOT NULL,
    data_upload TIMESTAMP DEFAULT NOW()
    );`.then(console.log('Criou Dc')).catch(console.log(error))
}

const createProntuarioTable =async () =>{
    const query = await db`
    CREATE TABLE Prontuario (
    in_prontuario SERIAL PRIMARY KEY,
    in_animal INT REFERENCES Animal(in_animal) ON DELETE CASCADE,
    in_vacina INT REFERENCES Vacina(in_vacina) ON DELETE SET NULL,
    in_medicamento INT REFERENCES Medicamento(in_medicamento) ON DELETE SET NULL,
    in_exame INT REFERENCES Exame(in_exame) ON DELETE SET NULL,
    in_consulta INT REFERENCES Consulta(in_consulta) ON DELETE SET NULL,
    observacoes TEXT
    );`.then(console.log('Criou Po')).catch(console.log(error))
}

const runMigrations = async () => {
    try {
        await createEnderecoTable()
        await createTelefoneTable()
        await createLoginTable()
        await createDonoTable()
        await createVeterinariaTable()
        await createAnimalTable()
        await createVacinaTable()
        await createMedicamentoTable()
        await createConsultaTable()
        await createExameTable()
        //await createDocumentoTable()
        //await createProntuarioTable()
        //await createTesteTable()
        console.log('Todas as tabelas foram criadas com sucesso.');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    }
}

module.exports = {
    runMigrations
}