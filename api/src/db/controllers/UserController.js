const bcrypt = require('bcryptjs');
const User = require('../models/User');

class UserController {
  email;
  password;
  res;

  constructor(email, password, res) {
    this.email = email;
    this.password = password;
    this.res = res;
  }

  async store() {
    const hashedPassword = bcrypt.hashSync(this.password, 8);

    const user = new User({
      email: this.email,
      password: hashedPassword,
      isAdmin: true,  
      createdAt: new Date(),
    });

    try {
      await user.save();
      console.log('Usuário criado com sucesso.');

      this.res.status(201).send({ message: 'User created successfully' });
    } catch (err) {
      console.error('Erro ao criar o usuário:', err);
      this.res.status(400).send({ message: 'An error occurred while creating the user', error: err.message });
    }
  }

  async validateIfExists() {
    const user = await User.findOne({ email: this.email });
    if (!user) {
      return false;
    }
    return user;
  }

  async updatePassword(newPassword) {
    console.log('Atualizando senha para:', this.email);

    try {
      const user = await User.findOne({ email: this.email });

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 8);

      user.password = hashedPassword;  
      await user.save();

      console.log('Senha atualizada com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      throw new Error('Erro ao atualizar a senha no banco de dados.');
    }
  }

  async login() {
    try {
      const user = await User.findOne({ email: this.email });

      if (!user) {
        return this.res.status(400).send({ message: 'Usuário não encontrado.' });
      }

      const isPasswordValid = await bcrypt.compare(this.password, user.password);
      if (!isPasswordValid) {
        return this.res.status(401).send({ message: 'Senha inválida.' });
      }

      if (!user.isAdmin) {
        return this.res.status(403).send({ message: 'Acesso negado. Apenas administradores podem acessar.' });
      }

      this.res.status(200).send({ message: 'Login bem-sucedido.', user });
    } catch (error) {
      console.error('Erro ao tentar realizar o login:', error);
      this.res.status(500).send({ message: 'Erro ao realizar o login.', error: error.message });
    }
  }
}

module.exports = UserController;