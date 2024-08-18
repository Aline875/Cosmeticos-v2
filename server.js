const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri ="mongodb+srv://alinebeatriz875:f19hrNFLYDgQdZX6@cluster0.fern3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");

    // Schemas
    const database = client.db('cosmeticos');
    const usuariosCollection = database.collection('usuarios');
    const revendedoresCollection = database.collection('revendedores');

    // Rotas
    app.post('/api/usuario', async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
    
            if (!nome || !email || !senha) {
                return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
            }
    
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
        const revendedor = { nome, email, senha, cpf, telefone, aniversario };
        const result = await revendedoresCollection.insertOne(revendedor);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        console.error('Erro ao salvar o revendedor:', error);
        res.status(400).json({ error: error.message });
      }
    });

    app.post('/api/login', async (req, res) => {
      try {
        const { email, senha } = req.body;
        const usuario = await usuariosCollection.findOne({ email });
        const revendedor = await revendedoresCollection.findOne({ email });

        if (!usuario && !revendedor) {
          return res.status(400).json({ error: 'Email não encontrado' });
        }

        if ((usuario && usuario.senha !== senha) || (revendedor && revendedor.senha !== senha)) {
          return res.status(400).json({ error: 'Senha incorreta' });
        }

        const nome = usuario ? usuario.nome : revendedor.nome;
        res.status(200).json({ message: 'Login bem-sucedido', nome });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
    
  } finally {
  }
}

run().catch(console.dir);
