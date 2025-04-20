

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToke  = require('../middlewares/verifyToken');



router.route('/')
        .get( verifyToke, usersController.getAllUsers)
router.route('/regester')
        .post(usersController.regester)
router.route('/login')
        .post(usersController.login)
module.exports = router;
