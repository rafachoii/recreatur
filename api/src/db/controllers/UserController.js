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
      password: this.password,
      passwordHash: hashedPassword,
      createdAt: new Date(),
    });

    try {
      await user.save();
      console.log("Usuário criado com sucesso.");

      this.res.status(201).send({ message: 'User created successfully' });
    } catch (err) {
      console.error("Erro ao criar o usuário:", err);
      this.res.status(400).send({ message: 'An error occurred while creating the user', error: err.message });
    }
  }

  async validateIfExists() {
    const userExists = await User.find({ email: this.email });
    return userExists.length > 0 ? userExists : false;
  }

  async login() {
    const user = await User.findOne({ email: this.email });
    
    if (!user) {
      return this.res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    
    const isMatch = bcrypt.compareSync(this.password, user.passwordHash);
    
    if (!isMatch) {
      return this.res.status(401).send({ message: 'Senha incorreta.' });
    }

    this.res.status(200).send({ message: 'Login bem-sucedido.' });
  }


  async updatePassword(newPassword) {
    console.log("Atualizando senha para:", this.email);
  
    try {
      const user = await User.findOne({ email: this.email });
  
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }
  
      const hashedPassword = bcrypt.hashSync(newPassword, 8);
  
      user.password = newPassword;  
      user.passwordHash = hashedPassword;  
  
      await user.save();
  
      console.log("Senha atualizada com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      throw new Error("Erro ao atualizar a senha no banco de dados.");
    }
  }  
}

module.exports = UserController;