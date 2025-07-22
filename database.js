const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_KSp0RhkeVsg2@ep-polished-haze-aciv2kug-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

pool.query(`
    CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        endereco TEXT,
        telefone VARCHAR(20),
        descricao TEXT
    )
`).catch(err => console.error('Erro ao criar tabela:', err));

module.exports = pool;