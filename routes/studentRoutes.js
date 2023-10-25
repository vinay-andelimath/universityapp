const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

//Student A Register 
router.post('/registerStudentA', studentController.registerStudentA);
//Student B Register
router.post('/registerStudentB', studentController.registerStudentB);  

// Student A login
router.post('/loginStudentA', studentController.loginStudentA);  


// router.get('/loginA/sessions',studentController.getFreeSessions);

// router.post('loginA/sessions/:sessionId/book',studentController.bookSession);

// Student B login
router.post('/loginStudentB', studentController.loginStudentB); 

// router.get('/loginA/sessions',studentController.getFreeSessions);

// router.post('loginA/sessions/:sessionId/book',studentController.bookSession);
module.exports = router; 
