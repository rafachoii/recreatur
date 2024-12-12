const User = require('../../../db/models/User');

async function createAdmin(app) {
  app.post('/auth/create-admin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
    }

    try {
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        return res.status(400).send({ message: 'Já existe um administrador com este email.' });
      }

      const newAdmin = new User({
        email,
        password, 
        isAdmin: true,  
      });

      await newAdmin.save();

      res.status(201).send({ message: 'Administrador criado com sucesso!' });
    } catch (err) {
      console.error('Erro ao criar administrador:', err); 
      res.status(500).send({ message: 'Erro ao criar administrador.', error: err.message });
    }
  });
}

module.exports = createAdmin;