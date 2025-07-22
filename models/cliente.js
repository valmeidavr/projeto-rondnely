const pool = require('../database');

class Cliente {
    static async criar(cliente, callback) {
        const { nome, endereco, telefone, descricao } = cliente;
        const sql = 'INSERT INTO clientes (nome, endereco, telefone, descricao) VALUES ($1, $2, $3, $4) RETURNING *';
        try {
            const result = await pool.query(sql, [nome, endereco, telefone, descricao]);
            callback(null, result.rows[0]);
        } catch (err) {
            callback(err);
        }
    }

    static async listarTodos(callback) {
        const sql = 'SELECT * FROM clientes';
        try {
            const result = await pool.query(sql);
            callback(null, result.rows);
        } catch (err) {
            callback(err);
        }
    }

    static async buscarPorId(id, callback) {
        const sql = 'SELECT * FROM clientes WHERE id = $1';
        try {
            const result = await pool.query(sql, [id]);
            callback(null, result.rows[0]);
        } catch (err) {
            callback(err);
        }
    }

    static async atualizar(id, cliente, callback) {
        const { nome, endereco, telefone, descricao } = cliente;
        const sql = 'UPDATE clientes SET nome = $1, endereco = $2, telefone = $3, descricao = $4 WHERE id = $5 RETURNING *';
        try {
            const result = await pool.query(sql, [nome, endereco, telefone, descricao, id]);
            callback(null, result.rows[0]);
        } catch (err) {
            callback(err);
        }
    }

    static async deletar(id, callback) {
        const sql = 'DELETE FROM clientes WHERE id = $1';
        try {
            await pool.query(sql, [id]);
            callback(null, { deletedId: id });
        } catch (err) {
            callback(err);
        }
    }
}

module.exports = Cliente;