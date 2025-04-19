

const express = require('express');
const router = express.Router();
const validationcourse = require('../middlewares/vallidationSchima')

const coursesController = require('../controllers/courses.controller')


router.route('/')
        .get(coursesController.getCours)
        .post(validationcourse(), coursesController.addCourse)
router.route('/:id')
        .get(coursesController.gatSingleCourse)
        .patch(coursesController.updataCourse)
        .delete(coursesController.deleteCourse)


module.exports = router;
