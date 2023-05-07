const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserDto = require('../dto/return/UserReturnDto');
const { generateSecretKey } = require('../utils/utils');


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Forneça o email e a senha' });
    }

    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verificar se a senha é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar token JWT
    const secretKey = generateSecretKey(32);
    process.env.JWT_SECRET = secretKey;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60d' });
    process.env.JWT_SECRET = token;

    const userDto = UserDto(user);
    // Retornar o token
    return res.status(200).json({ userDto, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno do servidor', details: err.message });
  }
};

module.exports = { login };
