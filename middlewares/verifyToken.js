const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const { FAIL } = require('../utils/httpsStatus');


const verifyToken = (req, res, next) => {
        const authHeader = req.headers['Authorization'] || req.headers['authorization'];
        if (!authHeader) {
                const error =  appError.create("No token provided", 401, FAIL);
                return next(error);
        }
        const token = authHeader.split(' ')[1];
        try {
                jwt.verify(token, process.env.JWT_SECRET)
                next()
        } catch (err) {
                const error =  appError.create("invalid token", 401, FAIL);
                return next(error)
        }
        console.log(decodeToekn)
        next();
}

module.exports = verifyToken;