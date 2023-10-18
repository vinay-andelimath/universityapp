const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

//Student Register
router.post('/register', studentController.register);  

// Student A login
router.post('/loginA', studentController.login);                        

// Student B login
router.post('/loginB', studentController.login);

module.exports = router;
