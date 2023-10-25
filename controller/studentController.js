const StudentA = require('../models/studenta');
const StudentB=require('../models/studentb');
const Session = require('../models/session');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports = {


    registerStudentA: async (req, res) => {
        const { universityId, password } = req.body;

        try {
            // Check if the student already exists
            const existingStudent = await StudentA.findOne({ universityId });

            if (existingStudent) {
                return res.status(400).json({ message: 'StudentA already exists' });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new student record with the hashed password
            const studentA = new StudentA({
                universityId,
                password: hashedPassword,
            });

            // Generate a unique token using UUID
            const token = uuid.v4();
            studentA.token = token;

            // Save the student to the database
            await studentA.save();

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    registerStudentB: async (req, res) => {
        const { universityId, password } = req.body;

        try {
            // Check if the student already exists
            const existingStudent = await StudentB.findOne({ universityId });

            if (existingStudent) {
                return res.status(400).json({ message: 'StudentB already exists' });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new student record with the hashed password
            const studentB = new StudentB({
                universityId,
                password: hashedPassword,
            });

            // Generate a unique token using UUID
            const token = uuid.v4();
            studentB.token = token;

            // Save the student to the database
            await studentB.save();

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    loginStudentA: async (req, res) => {
        console.log("Receives the request from Student A");
        const { universityId, password } = req.body;
        console.log(universityId);
        console.log(password);

        try {
            const studentA = await StudentA.findOne({ universityId });
            console.log(studentA);
            if (!studentA) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, studentA.password);
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate a unique token using UUID
            const token = uuid.v4();
            console.log(token);

            // Update the student's token in the database
            studentA.token = token;
            await studentA.save();

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    loginStudentB: async (req, res) => {
        console.log("Receives the request from Student B");
        const { universityId, password } = req.body;
        console.log(universityId);
        console.log(password);

        try {
            const studentB = await StudentB.findOne({ universityId });
            console.log(studentB);
            if (!studentB) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, studentB.password);
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate a unique token using UUID
            const token = uuid.v4();
            console.log(token);

            // Update the student's token in the database
            studentB.token = token;
            await studentB.save();

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
//     getFreeSessions: async (req, res) => {
//         // Get free sessions logic
//         try {
//             const currentDate = new Date();
//             const dayOfWeek = currentDate.getDay();
//             //array of days=[sunday,monday,wed....]
//             //available days 4 and 5 that is thursday and friday
//             const availableDays = [5, 6];
//             if (availableDays.includes(dayOfWeek) && currentDate.getHours() === 13) {
//                 const availableSession = await Session.find({ available: true });

//                 res.json(availableSession);
//                 console.log(availableSession);
//             } else {
//                 res.status(200).json({ message: 'Dean is not available now' });
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'internal server error' });
//         }
//     },
//     // getFreeSessions: async (req, res) => {
//     //     try {
//     //         const currentDate = new Date();
//     //         const dayOfWeek = currentDate.getDay();
//     //         const currentHour = currentDate.getHours();
//     //         const currentMinutes = currentDate.getMinutes();

//     //         // Define the target day (6 represents Saturday)
//     //         const targetDay = 6;
//     //         // Define the target start time (4:50 PM) and end time (5:50 PM)
//     //         const targetStartTime = 16 * 60 + 50; // 16:50 (24-hour format)
//     //         const targetEndTime = 17 * 60 + 50;   // 17:50 (24-hour format)

//     //         if (dayOfWeek === targetDay && currentHour * 60 + currentMinutes >= targetStartTime && currentHour * 60 + currentMinutes <= targetEndTime) {
//     //             const availableSession = await Session.find({ available: true });
//     //             res.json(availableSession);
//     //         } else {
//     //             res.status(200).json({ message: 'Dean is not available now' });
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //         res.status(500).json({ message: 'Internal server error' });
//     //     }
//     // },



//     // Query the database for available sessions
//     // const sessions = await Session.find({ available: true });

//     // res.json(sessions);



//     //     bookSession: async (req, res) => {
//     //         // Booking a session logic
//     //         // Update the session in the database to mark it as booked by the student
//     //         const session = await Session.findById(req.params.sessionId);

//     //         if (!session) {
//     //             return res.status(404).json({ message: 'Session not found' });
//     //         }

//     //         if (session.available) {
//     //             // Book the session
//     //             session.bookedBy = req.user._id;
//     //             session.available = false;
//     //             await session.save();

//     //             res.json({ message: 'Session booked successfully' });
//     //         } else {
//     //             res.status(400).json({ message: 'Session is already booked' });
//     //         }
//     //     },
//     bookSession: async (req, res) => {
//         try {
//             // Parse the session ID from the request parameters
//             const { sessionId } = req.params;

//             // Check if the session exists and is available
//             const session = await Session.findOne({ _id: sessionId, available: true });

//             if (!session) {
//                 return res.status(404).json({ message: 'Session not found or not available.' });
//             }

//             // Generate a unique booking token (UUID)
//             const bookingToken = uuid.v4();

//             // Update the session to mark it as booked by Student A
//             session.available = false;
//             session.bookedBy = bookingToken;

//             // Save the updated session in the database
//             await session.save();

//             return res.status(200).json({ message: 'Session booked successfully.', bookingToken });
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Internal server error' });
//         }
//     },
// 
}