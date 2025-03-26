const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  id_user: { type: String, required: true }
});

module.exports = mongoose.model('File', fileSchema);