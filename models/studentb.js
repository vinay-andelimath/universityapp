const mongoose = require('mongoose');


// Define Student A Schema
const studentBSchema = new mongoose.Schema({
  universityId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }
});


//append the model to student schema
const StudentB = mongoose.model('StudentB', studentBSchema);


//export the student
module.exports = StudentB;
