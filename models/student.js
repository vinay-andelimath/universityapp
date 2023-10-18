const mongoose = require('mongoose');


// Define Student Schema
const studentSchema = new mongoose.Schema({
  universityId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }
});
//append the model to student schema
const Student = mongoose.model('Student', studentSchema);

//export the student
module.exports = Student;
