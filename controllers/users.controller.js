const asyncWraper = require("../middlewares/asyncWraper");
const user = require("../models/user.model");
const { SUCCESS } = require("../utils/httpsStatus");



const getAllUsers = asyncWraper(
        async (req, res, next) => {
                let Qery = req.query;
                const limit = Qery.limit;
                const page = Qery.page;
                let users;
                if (limit > 0) {
                        const skip = (page - 1) * limit;
                        users = await user.find({}, { "__v": false }).limit(limit).skip(skip)
                } else {
                        users = await user.find({}, { "__v": false })
                }
                return res.status(200).json({ status: SUCCESS, data: { users } })
        }
)
const regester = (req, res) => {}
const login = (req, res) => {}


module.exports = { getAllUsers, regester, login }