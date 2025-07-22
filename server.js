const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Backend de Clientes funcionando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});