const express = require('express');
const router = express.Router();
const userController = require ('../controller/user.Controller.js');
// const auth = require ('../middleware/authentication.js');

router.post ('/register',userController.resister);
router.post ('/login',userController.Userlogin);

module.exports= router;