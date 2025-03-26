const { Console } = require('console');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

function generateToken() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let token = "";
  for (let i = 0; i < 20; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }

    // Создаем токен авторизации
    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const token = user.token;
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при входе' });
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    username = req.body.name;
    password = req.body.password;
    age = req.body.age;
    education = req.body.education;
    const newUser = new User({
        username: username,
        age: age,
        education: education,
        password: password,
        token: generateToken(),
    });
    newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json({ message: 'Пользователь удален' });
  } catch (err) {
    console.error('Ошибка при удалении пользователя:', err);
    res.status(500).json({ error: 'Ошибка при удалении пользователя' });
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ token });
    console.log(token, req.body);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    user.password = password;
    await user.save();

    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении пароля' });
  }
}

exports.getUser = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ username: name });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      age: user.age,
      education: user.education
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
  }
}

exports.genUserToken = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ token });
    console.log(token);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    user.token = generateToken();
    await user.save();

    res.json({ message: 'Токен успешно изменен' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении токена' });
  }
}