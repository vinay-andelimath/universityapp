const mongoose = require('mongoose');


// Define Student A Schema
const studentASchema = new mongoose.Schema({
  universityId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }
});


//append the model to student schema
const StudentA = mongoose.model('StudentA', studentASchema);


//export the student
module.exports = StudentA;
