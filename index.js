const express = require('express');
const app = express();
const mongose = require('mongoose');
const url = "mongodb+srv://mohammedmjj2025:123@cluster-test.7mz8idu.mongodb.net/codeZone?retryWrites=true&w=majority&appName=Cluster-test"
mongose.connect(url).then(()=> {
        console.log("mongo conecetd")
})
app.use(express.json());
const coursesRouter = require('./routes/courses.route');

app.use('/api/courses', coursesRouter);

app.listen(5000, () => {
        console.log('listen in port 5000')
})  