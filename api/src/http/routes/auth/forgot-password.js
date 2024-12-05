const crypto = require('node:crypto');
const nodemailer = require('nodemailer');
const UserController = require('../../../db/controllers/UserController');
const { forgotPasswordSchema } = require('../../../utils/schemas/userSchemas');
const env = require('../../../utils/env');

async function updateUserPassword(app) {
  app.post('/auth/forgot-password', async (req, res) => {
    const informations = forgotPasswordSchema.safeParse(req.body);
    console.log("Informações recebidas:", req.body);
  
    if (!informations.success || !informations.data) {
      console.error("Dados de atualização de senha inválidos ou incompletos.");
      return res.status(400).send({
        error: 'As informações para atualização de senha estão incompletas ou inválidas',
      });
    }
  
    const { email } = informations.data;
  
    if (!email) {
      console.error("E-mail não fornecido.");
      return res.status(400).send({
        error: 'O e-mail é obrigatório.',
      });
    }
  
    const newPassword = crypto.randomBytes(6).toString('hex');
    console.log("Nova senha gerada:", newPassword);
  
    const userController = new UserController(email, newPassword, res);
  
    try {
      await userController.updatePassword(newPassword);
  
      const transporter = nodemailer.createTransport({
        host: env.BREVO_HOST,
        port: Number(env.BREVO_PORT),
        auth: {
          user: env.BREVO_USER,
          pass: env.BREVO_PASS,
        },
      });
  
      const mailOptions = {
        from: env.BREVO_SENDER,
        to: email,
        subject: 'Sua nova senha - Projeto Recreatur',
        text: `Olá! Sua nova senha de acesso ao sistema do Projeto Recreatur é ${newPassword}. Use-a para acessar sua conta.`,
      };
  
      try {
        console.log("Enviando e-mail...");
        await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso.");
        return res.status(200).send({ message: 'Nova senha enviada ao e-mail do usuário.' });
      } catch (mailError) {
        console.error("Erro ao enviar o e-mail:", mailError);
        return res.status(500).send({ message: 'Erro ao enviar o e-mail de recuperação de senha.', error: mailError.message });
      }
  
    } catch (e) {
      console.error("Erro ao atualizar a senha:", e);
      return res.status(500).send({ message: 'Erro ao processar a solicitação de recuperação de senha.', error: e.message });
    }
  });  
}

module.exports = updateUserPassword;