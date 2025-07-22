const express = require('express');
const Cliente = require('../models/cliente');
const router = express.Router();

router.get('/', (req, res) => {
    Cliente.listarTodos((err, clientes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(clientes);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Cliente.buscarPorId(id, (err, cliente) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(cliente);
    });
});

router.post('/', (req, res) => {
    const { nome, endereco, telefone, descricao } = req.body;
    
    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    const cliente = { nome, endereco, telefone, descricao };
    Cliente.criar(cliente, (err, novoCliente) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(novoCliente);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nome, endereco, telefone, descricao } = req.body;
    
    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    const cliente = { nome, endereco, telefone, descricao };
    Cliente.atualizar(id, cliente, (err, clienteAtualizado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(clienteAtualizado);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Cliente.deletar(id, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente deletado com sucesso' });
    });
});

module.exports = router;