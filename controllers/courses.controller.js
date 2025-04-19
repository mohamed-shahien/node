
const { validationResult } = require('express-validator');
const course = require('../models/course.model')
const { SUCCESS, FAIL } = require('../utils/httpsStatus');
const asyncWraper = require('../middlewares/asyncWraper');
const appError = require('../utils/appError');

const getCours = asyncWraper(
        async (req, res, next) => {
                let Qery = req.query;
                const limit = Qery.limit;
                const page = Qery.page;
                let courses;
                if (limit > 0) {
                        const skip = (page - 1) * limit;
                        courses = await course.find({}, { "__v": false }).limit(limit).skip(skip)
                } else {
                        courses = await course.find({}, { "__v": false })
                }
                return res.status(200).json({ status: SUCCESS, data: { courses } })
        }
)
const gatSingleCourse = asyncWraper(
        async (req, res, next) => {
                const cours = await course.findById(req.params.id)
                if (!cours) {
                        const error = appError.ccreate("course not found", 404, FAIL)
                        return next(error)
                }
                return res.status(200).json({ status: SUCCESS, data: { cours } })
        }
)
const addCourse = asyncWraper(
        async (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        const error = appError.ccreate("validation error", 400, FAIL)
                        return next(error)
                }
                const newCourse = new course(req.body)
                await newCourse.save()
                return res.status(200).json({ status: SUCCESS, data: { newCourse } })
        }
)
const updataCourse = asyncWraper(
        async (req, res) => {
                const coursID = req.params.id;
                const updataCourse = await course.updateOne({ _id: coursID }, { $set: { ...req.body } })
                return res.status(200).json({ status: SUCCESS, data: { updataCourse } })
        }
)
const deleteCourse = asyncWraper(
        async (req, res) => {
                const data = await course.deleteOne({ _id: req.params.id },)
                return res.status(200).json({ status: SUCCESS, data: { data } });
        }
)
module.exports = { getCours, gatSingleCourse, addCourse, updataCourse, deleteCourse }