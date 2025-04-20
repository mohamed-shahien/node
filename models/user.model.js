const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: [true, 'First name is required']
        },
        lastName: {
                type: String,
                required: [true, 'Last name is required']
        },
        email: {
                type: String,
                required: [true, 'Email is required'],
                unique: true,
                validate: {
                        validator: validator.isEmail,
                        message: 'Field must be a valid email'
                }
        },
        password: {
                type: String,
                required: [true, 'Password is required']
        }
});

module.exports = mongoose.model('User', userSchema);
