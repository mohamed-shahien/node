
let { courses } = require('../data/courses');
const { validationResult } = require('express-validator');
const getCours = (req, res) => {
        res.json(courses)
}
const gatSingleCourse = (req, res) => {
        const coursID = +req.params.idcours;
        const cours = courses.find((cours) => cours.id === coursID)
        if (!cours) {
                return res.status(404).json({ msg: "cours not found" })
        }
        res.status(200).json(cours)
}
const addCourse =  (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json(errors.array())
                }
                const cours = { id: courses.length + 1, ...req.body };
                courses.push(cours)
                console.log(req.body)
                res.status(201).json(cours)
        }
const updataCourse = (req, res) => {
        const coursID = +req.params.idcours;
        let cours = courses.find((cours) => cours.id === coursID)
        if (!cours) {
                return res.status(404).json({ msg: "course not found" })
        }
        cours = { ...cours, ...req.body }
        res.status(200).json(cours)
}
const deleteCourse = (req, res) => {
        const coursID = +req.params.idcours;
        const hasincourss = courses.find((cours) => cours.id === coursID);
        if (!hasincourss) {
                return res.status(404).json({ msg: "cours not found" });
        }
        courses = courses.filter((curs) => curs.id !== coursID);

        res.status(200).json({ msg: "cours deleted successfully" });
}


module.exports = { getCours, gatSingleCourse, addCourse, updataCourse, deleteCourse }