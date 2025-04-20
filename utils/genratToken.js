const jwt = require('jsonwebtoken');
 module.exports = async (payload, expires) => {
        const token = await jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: expires });
        return token;
 }