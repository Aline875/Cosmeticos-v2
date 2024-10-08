const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cosmeticos';
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB', error);
});

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 }
});

const revendedorSchema = new mongoose.Schema({
    nome: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 },
    cpf: { type: String, required: true, unique: true },
    telefone: { type: String, required: true, unique: true },
    aniversario: { type: Date, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Revendedor = mongoose.model('Revendedor', revendedorSchema);

app.post('/api/usuario', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const usuario = new Usuario({ nome, email, senha });
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Erro ao salvar o usuário:', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/revendedor', async (req, res) => {
    try {
        const { nome, email, senha, cpf, telefone, aniversario } = req.body;
        const revendedor = new Revendedor({ nome, email, senha, cpf, telefone, aniversario });
        await revendedor.save();
        res.status(201).json(revendedor);
    } catch (error) {
        console.error('Erro ao salvar o revendedor:', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email });
        const revendedor = await Revendedor.findOne({ email });

        if (!usuario || !revendedor) {
            return res.status(400).json({ error: 'Email não encontrado' });
        }

        if (usuario.senha !== senha || revendedor.senha !== senha) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', nome: usuario.nome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
