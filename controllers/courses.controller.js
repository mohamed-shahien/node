
const { validationResult } = require('express-validator');
const course = require('../models/course.model')

const getCours = async (req, res) => {
        const courses = await course.find()
        res.json(courses)
}
const gatSingleCourse = async (req, res) => {
        try {

                const cours = await course.findById(req.params.idcours)
                if (!cours) {
                        return res.status(404).json({ msg: "cours not found" })
                }
                return res.status(200).json(cours)
        } catch (err) {
                return res.status(400).json({msg: "invaled object id m"})
        }
}
const addCourse = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json(errors.array())
        }
        const newCourse = new course(req.body)
        await newCourse.save()
        res.status(200).json(newCourse)
}
const updataCourse = async (req, res) => {
        const coursID = req.params.idcours;
        try {
                const updataCourse = await course.updateOne({_id: coursID}, {$set : {...req.body}})
                res.status(200).json(updataCourse)
        } catch (err) {
                return res.status(400).json({msg: "can not addding"})
        }
}
const deleteCourse = async (req, res) => {
        const data =  await course.deleteOne({_id: req.params.idcours}, )

        res.status(200).json({ msg: "cours deleted successfully" , data});
}


module.exports = { getCours, gatSingleCourse, addCourse, updataCourse, deleteCourse }