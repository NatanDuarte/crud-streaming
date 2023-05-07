const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const UserDto = require('../dto/return/UserReturnDto');


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
    if (emailInDB.length > 0) {
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

    const userDto = UserDto(user);
    res.status(201).json({ userDto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};


userController.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    const listOfUserDtos = [];
    users.forEach(user => listOfUserDtos.push(UserDto(user)))
    res.json({ listOfUserDtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
  }
};


userController.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userDto = UserDto(user);
    res.json({ userDto });
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

    const userDto = UserDto(user);
    res.status(200).json({ userDto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};


userController.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true }).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro ao deletar usuário', details: error.message });
  }
};

module.exports = userController;
