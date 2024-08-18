const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Configurações do servidor
const app = express();
app.use(express.json());
app.use(cors());

// URL de conexão com o MongoDB Atlas
const uri = process.env.MONGO_URL || 'mongodb+srv://alinebeatriz875:f19hrNFLYDgQdZX6@cluster0.fern3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Configuração do cliente MongoDB
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Conectar ao MongoDB Atlas
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error);
    }
}
connectToMongoDB();

// Definição dos esquemas
const usuarioSchema = {
    nome: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 }
};

const revendedorSchema = {
    nome: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 },
    cpf: { type: String, required: true, unique: true },
    telefone: { type: String, required: true, unique: true },
    aniversario: { type: Date, required: true }
};

const db = client.db('cosmeticos'); // Nome do banco de dados
const Usuario = db.collection('usuarios');
const Revendedor = db.collection('revendedores');

// Rotas da API
app.post('/api/usuario', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }

        const usuario = { nome, email, senha };
        const result = await Usuario.insertOne(usuario);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Erro ao salvar o usuário:', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/revendedor', async (req, res) => {
    try {
        const { nome, email, senha, cpf, telefone, aniversario } = req.body;

        if (!nome || !email || !senha || !cpf || !telefone || !aniversario) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const revendedor = { nome, email, senha, cpf, telefone, aniversario };
        const result = await Revendedor.insertOne(revendedor);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Erro ao salvar o revendedor:', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const usuario = await Usuario.findOne({ email });
        const revendedor = await Revendedor.findOne({ email });

        if (!usuario && !revendedor) {
            return res.status(400).json({ error: 'Email não encontrado' });
        }

        const user = usuario || revendedor;

        if (user.senha !== senha) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', nome: user.nome });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
