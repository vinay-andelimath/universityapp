const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const deanRoutes = require('./routes/deanRoutes');

const app = express();

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/univerity2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
});

// Middleware for parsing JSON requests
app.use(express.json());

// Define the student routes
app.use('/student', studentRoutes);
app.use('/dean', deanRoutes);

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
