const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateSecretKey } = require('./api/utils/utils');
const authRoutes = require('./api/routes/authRoutes');
const livestreamRoutes = require('./api/routes/livestreamRoutes');
const userRoutes = require('./api/routes/userRoutes');
const User = require('./api/models/User');
require('dotenv').config();


const app = express();

const secretKey = generateSecretKey(32);
process.env.JWT_SECRET = secretKey;

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(livestreamRoutes);
app.use(userRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(error => console.error(error));

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Senha inválida');


    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Erro ao fazer login' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
