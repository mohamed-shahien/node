const express = require('express');
const app = express();
app.use(express.json());
const coursesRouter = require('./routes/courses.route');

app.use('/api/courss', coursesRouter);

app.listen(5000, () => {
        console.log('listen in port 5000')
})  