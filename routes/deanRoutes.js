const express = require('express');
const router = express.Router();
const deanController = require('../controller/deanController');

//Student Register
router.post('/register', deanController.register);  

// Student A login
router.post('/loginA', deanController.login);                        

// Student B login
router.post('/loginB', deanController.login);

module.exports = router;
