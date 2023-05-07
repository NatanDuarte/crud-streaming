const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');


const userController = {};


userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name === null || name === undefined) {
      res.status(400).json({ error: 'O campo name é obrigatório' })
      return;
    }

    if (password === null || password === undefined) {
      res.status(400).json({ error: 'O campo password é obrigatório' })
      return;
    }

    if (email === null || email === undefined) {
      res.status(400).json({ error: 'O campo email é obrigatório' })
      return;
    }

    const emailInDB = await User.find({ email: email });
    if (emailInDB != null) {
      res.status(409).json({ error: 'E-mail já existe' })
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Read image file
    const image = fs.readFileSync('./public/images/user.png');
    const base64Image = Buffer.from(image).toString('base64');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage: base64Image,
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};


userController.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
  }
};


userController.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
};


userController.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name === null || name === undefined) {
      res.status(400).json({ error: 'O campo name é obrigatório' })
      return;
    }

    if (password === null || password === undefined) {
      res.status(400).json({ error: 'O campo password é obrigatório' })
      return;
    }

    if (email === null || email === undefined) {
      res.status(400).json({ error: 'O campo email é obrigatório' })
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};


userController.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
};

module.exports = userController;
