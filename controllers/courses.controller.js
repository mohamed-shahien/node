
const { validationResult } = require('express-validator');
const course = require('../models/course.model')
const { SUCCESS, FAIL, ERROR } = require('../utils/httpsStatus');

const getCours = async (req, res) => {
        let Qery = req.query;
        const limet = Qery.limit || 4;
        const page = Qery.page || 1;
        const skip = (page - 1) * limet;
        try {
                const courses = await course.find({}, { "__v": false }).limit(limet).skip(skip)
                return res.status(200).json({ status: SUCCESS, data: { courses } })
        } catch (arror) {
                return res.status(400).json({ status: ERROR, Code: 400, data: null, message: arror.message })
        }
}
const gatSingleCourse = async (req, res) => {
        try {
                const cours = await course.findById(req.params.id)
                if (!cours) {
                        return res.status(404).json({ status: FAIL, data: { title: "thes course not found" } })
                }
                return res.status(200).json({ status: SUCCESS, data: { cours } })
        } catch (err) {
                return res.status(400).json({ status: ERROR, message: err.message, Code: 400, data: null })
        }
}
const addCourse = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ status: ERROR, Code: 400, data: errors.array() })
        }
        const newCourse = new course(req.body)
        await newCourse.save()
        res.status(200).json({ status: SUCCESS, data: { newCourse } })
}
const updataCourse = async (req, res) => {
        const coursID = req.params.id;
        try {
                const updataCourse = await course.updateOne({ _id: coursID }, { $set: { ...req.body } })
                res.status(200).json({ status: SUCCESS, data: { updataCourse } })
        } catch (err) {
                return res.status(400).json({ status: ERROR, message: err.message, Code: 400, data: null })
        }
}
const deleteCourse = async (req, res) => {
        const data = await course.deleteOne({ _id: req.params.id },)
        res.status(200).json({ status: SUCCESS, data: { data } });
}


module.exports = { getCours, gatSingleCourse, addCourse, updataCourse, deleteCourse }




// fetch("http://localhost:5000/api/courses")
//         .then((res) => res.json())
//         .then((data) => {
//                 console.log(data)
//         })
//         .catch((err) => {
//                 console.error("Fetch error:", err);
//         });
