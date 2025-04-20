const asyncWraper = require("../middlewares/asyncWraper");
const user = require("../models/user.model");
const { SUCCESS, FAIL } = require("../utils/httpsStatus");
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const gantatJWT = require('../utils/genratToken');



const getAllUsers = asyncWraper(
        async (req, res, next) => {
                let Qery = req.query;
                const limit = Qery.limit;
                const page = Qery.page;
                let users;
                if (limit > 0) {
                        const skip = (page - 1) * limit;
                        users = await user.find({}, { "__v": false, "password": false }).limit(limit).skip(skip)
                } else {
                        users = await user.find({}, { "__v": false, "password": false })
                }
                return res.status(200).json({ status: SUCCESS, data: { users } })
        }
)
const regester = asyncWraper(
        async (req, res, next) => {
                const { firstName, lastName, email, password } = req.body;
                const oldUser = await user.findOne({ email: email })
                if (oldUser) {
                        const errror = appError.create("user already exist", 404, FAIL)
                        return next(errror)
                }

                const hashedPassword = await bcrypt.hash(password, 10,)
                const newUser = new user({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword
                })
                // genrate token
                const token = await gantatJWT({email : newUser.email, id : newUser._id}, "1d")
                newUser.token = token;

                await newUser.save()
                return res.status(201).json({ status: SUCCESS, data: { user: newUser } })
        }
)
const login = asyncWraper(
        async (req, res ,next) => {
                const { email, password } = req.body;
                if (!email && !password) {
                        const error = appError.create("email and password are required", 400, FAIL)
                        return next(error)
                }
                const userData = await user.findOne({ email: email });
                if (!userData) {
                        const error = appError.create("invalid email or password", 400, FAIL)
                        return next(error)
                }
                const isMatch = await bcrypt.compare(password, userData.password);
                if (userData && isMatch) {
                        const token = await gantatJWT({email : userData.email, id : userData._id}, "1d")

                        return res.status(200).json({ status: SUCCESS, data: { user: "user logged in" , token} })
                } else {
                        const error = appError.create("invalid email or password", 400, FAIL)
                        return next(error)
                }
        }
)


module.exports = { getAllUsers, regester, login }