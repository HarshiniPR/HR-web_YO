const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const passportUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  provider_id: String,
});

passportUserSchema.plugin(findOrCreate);

const passportUser = mongoose.model('PassportUser', passportUserSchema);

module.exports = passportUser;