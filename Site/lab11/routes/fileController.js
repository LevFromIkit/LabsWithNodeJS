const File = require('../models/File');

exports.getFiles = async (req, res) => {
  try {
    // Получение списка файлов, принадлежащих текущему пользователю
    const files = await File.find({ owner: req.user.id });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении списка файлов' });
  }
};

exports.createFile = async (req, res) => {
  try {
    // Создание нового файла, принадлежащего текущему пользователю
    const { name, content } = req.body;
    const file = new File({ name, content, owner: req.user.id });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании файла' });
  }
};

exports.updateFile = async (req, res) => {
  try {
    // Обновление существующего файла
    const { id } = req.params;
    const { content } = req.body;
    const file = await File.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      { content },
      { new: true }
    );
    if (!file) {
      return res.status(404).json({ error: 'Файл не найден' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении файла' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    // Удаление существующего файла
    const { id } = req.params;
    const file = await File.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!file) {
      return res.status(404).json({ error: 'Файл не найден' });
    }
    res.json({ message: 'Файл удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении файла' });
  }
};