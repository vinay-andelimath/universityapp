const Dean = require('../models/dean');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports = {


    register: async (req, res) => {
        const { universityId, password } = req.body;

        try {
            // Check if the student already exists
            const existingDean = await Dean.findOne({ universityId });

            if (existingDean) {
                return res.status(400).json({ message: 'Student already exists' });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new student record with the hashed password
            const dean = new Dean({
                universityId,
                password: hashedPassword,
            });

            // Generate a unique token using UUID
            const token = uuid.v4();
            dean.token = token;

            // Save the student to the database
            await dean.save();

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    login: async (req, res) => {
        console.log("Receives the request from login A or B");
        const { universityId, password } = req.body;
        console.log(universityId);
        console.log(password);

        try {
            const dean = await Dean.findOne({ universityId });
            console.log(dean);
            if (!dean) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, dean.password);
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate a unique token using UUID
            const token = uuid.v4();
            console.log(token);

            // Update the student's token in the database
            dean.token = token;
            await dean.save();

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getFreeSessions: async (req, res) => {
        // Get free sessions logic
        // Query the database for available sessions
        const sessions = await Session.find({ available: true });

        res.json(sessions);
    },

    bookSession: async (req, res) => {
        // Booking a session logic
        // Update the session in the database to mark it as booked by the student
        const session = await Session.findById(req.params.sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        if (session.available) {
            // Book the session
            session.bookedBy = req.user._id;
            session.available = false;
            await session.save();

            res.json({ message: 'Session booked successfully' });
        } else {
            res.status(400).json({ message: 'Session is already booked' });
        }
    },
}