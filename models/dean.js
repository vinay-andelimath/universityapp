const mongoose = require('mongoose');


// Define dean Schema
const deanSchema = new mongoose.Schema({
  universityId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }
});
//append the model to dean schema
const Dean = mongoose.model('Dean', deanSchema);

//export the Dean Module
module.exports = Dean;
