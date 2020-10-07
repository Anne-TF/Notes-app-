const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true })

userSchema.methods.encryptPass = async password => {
  const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPass = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('user', userSchema);
