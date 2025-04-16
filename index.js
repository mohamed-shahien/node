require("dotenv").config()
const express = require('express');
const app = express();
const mongose = require('mongoose');
const url = process.env.MONGO_URL
mongose.connect(url).then(()=> {
        console.log("mongo conecetd")
})
app.use(express.json());
const coursesRouter = require('./routes/courses.route');
app.use('/api/courses', coursesRouter);

app.listen(process.env.PORT, () => {
        console.log('listen in port 5000')
})  