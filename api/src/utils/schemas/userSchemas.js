const z = require('zod')

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'O e-mail é obrigatório'),
})

module.exports = { loginSchema, signUpSchema, forgotPasswordSchema }