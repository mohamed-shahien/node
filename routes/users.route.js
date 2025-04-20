

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');



router.route('/')
        .get(usersController.getAllUsers)
router.route('/regester')
        .post(usersController.regester)
router.route('/login')
        .post(usersController.login)
module.exports = router;
