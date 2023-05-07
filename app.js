const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRoutes = require('./api/routes/authRoutes');
const livestreamRoutes = require('./api/routes/livestreamRoutes');
const userRoutes = require('./api/routes/userRoutes');
const User = require('./api/models/User');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use(authRoutes);
app.use('/stream', livestreamRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(error => console.error(error));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
