const mongoose = require('mongoose');
//create the session schema with date time available and token
const sessionSchema = new mongoose.Schema({
    date: Date,
    time: String,
    available: Boolean,
    token: String
});
const Session = mongoose.model('session', sessionSchema);
module.exports = Session;