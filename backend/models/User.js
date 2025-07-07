const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: String,
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  premiumTrialStart: { type: Date },
  premiumTrialEnd: { type: Date },
  isPremium: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
