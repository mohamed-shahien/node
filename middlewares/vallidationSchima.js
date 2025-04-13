const { body } = require('express-validator');

const validationcourse = () => {
        return [body('title').notEmpty().withMessage('title is required').isLength({ min: 3 }), body('price').notEmpty().withMessage('price is required')]
}

module.exports = validationcourse;