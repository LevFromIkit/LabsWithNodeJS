const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  education: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);