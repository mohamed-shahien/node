const express = require('express');
const app = express();

const courses = [
        {
                id: 1,
                title: "أساسيات HTML و CSS",
                price: "أكاديمية حسوب"
        },
        {
                id: 2,
                title: "مقدمة في JavaScript",
                price: "رواق"
        },
        {
                id: 3,
                title: "تطوير تطبيقات الموبايل باستخدام Flutter",
                price: "مهارات من Google"
        },
        {
                id: 4,
                title: "التسويق عبر الإنستقرام",
                price: "زد أكاديمي"
        },
        {
                id: 5,
                title: "تحليل البيانات باستخدام Excel",
                price: "إدراك"
        },
        {
                id: 6,
                title: "تصميم واجهات UI/UX",
                price: "أكاديمية طويق"
        },
        {
                id: 7,
                title: "مقدمة في Git و GitHub",
                price: "Coursera"
        },
        {
                id: 8,
                title: "كورس React للمبتدئين",
                price: "برمج"
        }
];


app.get('/api/courss' , (req ,res) => {
        res.json(courses)
})

app.get('/api/courss/:idcours' , (req ,res) => {
        const coursID = req.params.idcours;
        const cours = courses.find((cours) =>  cours.id === coursID )
        if(!cours){
                return res.status(404).json({msg: "cours not found"})
        }
        res.json(cours)
        console.log(req.params.idcours)
})




app.listen(5000, () => {
        console.log('listen in port 500')
})  