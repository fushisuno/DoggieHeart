const { error } = require('console')
const db = require('./db')

const createTesteTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS teste(
    id serial PRIMARY KEY,
    teste varchar(255),
    nome varchar(200) 
    );`
}

const createEnderecoTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Endereco(
    in_endereco SERIAL PRIMARY KEY,
    codigo_postal VARCHAR(200) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    rua VARCHAR(200) NOT NULL,
    numero_residencia INT NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    complemento VARCHAR(200) NOT NULL,
    uf VARCHAR(2) NOT NULL
    );`
}

const createTelefoneTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Telefone(
    in_telefone SERIAL PRIMARY KEY,
    ddd SMALLINT NOT NULL,
    numero VARCHAR(20) NOT NULL UNIQUE
    );`
}

/*
const createLoginTable = async () =>{
    const query = await db`
    CREATE TABLE IF NOT EXISTS Login(
    in_login SERIAL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    senha VARCHAR(200) NOT NULL,
    avatar BYTEA,
    data_cadastro DATE DEFAULT NOW()
    );`
}
*/

const createDonoTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Dono (
    in_dono SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100),
    cpf VARCHAR(100) NOT NULL,
    in_endereco INT REFERENCES Endereco(in_endereco) ON DELETE SET NULL,
    in_telefone INT REFERENCES Telefone(in_telefone) ON DELETE SET NULL,
    user_name VARCHAR(200) UNIQUE, 
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    avatar BYTEA,
    data_cadastro DATE DEFAULT NOW()
    );`
}

const createVeterinariaTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Veterinaria (
    in_veterinaria SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    in_endereco INT REFERENCES Endereco(in_endereco) ON DELETE SET NULL,
    in_telefone INT REFERENCES Telefone(in_telefone) ON DELETE SET NULL,
    user_name VARCHAR(200) UNIQUE, 
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    avatar BYTEA,
    data_cadastro DATE DEFAULT NOW()
    );`
}

const createEspecialidadeTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Especialidade (
    in_especialidade SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(200)
    );`
}

const createVeterinarioTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Veterinario (
    in_veterinario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100),
    crmv VARCHAR(100) NOT NULL,
    in_endereco INT REFERENCES Endereco(in_endereco) ON DELETE SET NULL,
    in_telefone INT REFERENCES Telefone(in_telefone) ON DELETE SET NULL,
    especialidade VARCHAR(100),
    in_veterinaria INT REFERENCES Veterinaria(in_veterinaria) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar BYTEA,
    data_cadastro DATE DEFAULT NOW()
    );`
}

const createAnimalTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Animal (
    in_animal SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,   
    especie VARCHAR(20) NOT NULL, 
    raca VARCHAR(100),
    idade INT CHECK (idade >= 0),
    sexo VARCHAR(100), 
    peso FLOAT, 
    foto VARCHAR(200), 
    ultima_consulta TIMESTAMP,
    in_dono INT REFERENCES Dono(in_dono) ON DELETE CASCADE,
    in_veterinaria INT REFERENCES Veterinaria(in_veterinaria)
    );`
}

/*
const createAgendaTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Agenda (
    in_agenda SERIAL PRIMARY KEY,
    data TIMESTAMP NOT NULL,
    tipo VARCHAR(200) NOT NULL,
    in_animal INT REFERENCES Animal(in_animal) NOT NULL ON DELETE SET NULL,
    in_veterinario INT REFERENCES Veterinario(in_veterinario) NOT NULL ON DELETE SET NULL,
    observações TEXT,
    situacao VARCHAR(100) NOT NULL
    );`
}

const createDocumentoTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Documento (
    in_documento SERIAL PRIMARY KEY,
    arquivo BYTEA NOT NULL,
    descricao TEXT,
    tipo_documento VARCHAR(255) NOT NULL,
    data_emissao DATE,
    data_upload TIMESTAMP DEFAULT NOW(),
    in_animal INT REFERENCES Animal(in_animal) ON DELETE SET NULL
    );`
}
*/

const createVacinaTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Vacina (
    in_vacina SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL, 
    ultima_aplicacao DATE DEFAULT NOW(),
    proxima_dose DATE,
    descricao TEXT,
    in_animal INT REFERENCES Animal(in_animal) ON DELETE SET NULL,
    in_veterinario INT REFERENCES Veterinario(in_veterinario) ON DELETE SET NULL
    );`
}


const createDocumentoTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Documento(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    data_aplicacao TIMESTAMP,
    proxima_aplicacao TIMESTAMP,
    data_validade TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pendente', 
    caminho_arquivo VARCHAR(255) NOT NULL,
    data_upload TIMESTAMP DEFAULT NOW(),
    descricao TEXT,
    in_animal INT REFERENCES Animal(in_animal) ON DELETE CASCADE
    );`
}

const createConsultaTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Consulta (
    in_consulta SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    motivo TEXT NOT NULL,
    tipo TEXT NOT NULL,
    status TEXT NOT NULL,
    historico TEXT,
    observacoes TEXT,
    in_animal INT REFERENCES Animal(in_animal) ON DELETE CASCADE,
    in_veterinario INT REFERENCES Veterinario(in_veterinario) ON DELETE SET NULL
    );`
}


const createExameTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Exame (
    in_exame SERIAL PRIMARY KEY,
    tipo TEXT,
    data_exame DATE,
    resultado TEXT,
    in_consulta INT REFERENCES Consulta(in_consulta)
    );`
}

const createHistoricoSaudeTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS HistoricoSaude (
    in_historico_saude SERIAL PRIMARY KEY,
    data_historico DATE,
    descricao TEXT,
    in_animal INT REFERENCES animal(in_animal) ON DELETE CASCADE
    );`;
}

const createProntuarioTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Prontuario (
    in_prontuario SERIAL PRIMARY KEY,
    in_animal INT REFERENCES Animal(in_animal) ON DELETE CASCADE,
    data_abertura DATE, 
    historico_medicamento TEXT,
    alergias TEXT,
    condicoes_preexistentes TEXT,
    observacoes TEXT,
    in_veterinario INT REFERENCES Veterinario(in_veterinario) ON DELETE SET NULL
    );`
}

const createReceitaTable = async () => {
    const query = await db`
    CREATE TABLE IF NOT EXISTS Receita (
    in_receita SERIAL PRIMARY KEY,
    in_consulta INT REFERENCES Consulta(in_consulta) ON DELETE SET NULL,
    medicamento VARCHAR(200), 
    dosagem VARCHAR(200),
    frequencia VARCHAR(200),
    duracao VARCHAR(200),
    in_veterinario INT REFERENCES Veterinario(in_veterinario) ON DELETE SET NULL
    );`
}

const runMigrations = async () => {
    try {
        await createEnderecoTable()
        await createTelefoneTable()
        await createDonoTable()
        await createVeterinariaTable()
        await createEspecialidadeTable()
        await createVeterinarioTable()
        await createAnimalTable()
        await createDocumentoTable()
        await createVacinaTable()
        await createConsultaTable()
        await createExameTable()
        await createHistoricoSaudeTable()
        await createProntuarioTable()
        await createReceitaTable()

        //await createTesteTable()
         console.log('Todas as tabelas foram criadas com sucesso.');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    }
}

module.exports = {
    runMigrations
}


/*

CREATE TABLE DicaCuidado (
    id SERIAL PRIMARY KEY,                          -- ID único da dica, gerado automaticamente
    categoria VARCHAR(50) NOT NULL,                -- Categoria da dica (ex: Alimentação, Exercícios)
    titulo VARCHAR(100) NOT NULL,                  -- Título da dica
    descricao TEXT,                                 -- Descrição geral da dica
    dicas TEXT[],                                   -- Lista de dicas (array de texto)
    video_url VARCHAR(255),                         -- URL do vídeo associado (opcional)
    imagem_url VARCHAR(255),                        -- URL da imagem associada à dica (opcional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data e hora de criação da dica
);

*/