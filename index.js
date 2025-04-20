require("dotenv").config()
const express = require('express');
const cors = require('cors')

const app = express();
const { ERROR } = require('./utils/httpsStatus');

const mongose = require('mongoose');
const url = process.env.MONGO_URL;
mongose.connect(url).then(() => {
        console.log("mongo conecetd")
})
app.use(cors())
app.use(express.json());
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

app.all('*', (req, res, next) => {
        return res.status(404).json({ status: ERROR, Code: 404, data: null, message: "the source not available " });
});
app.use((error, req, res, next) => {
        return res.status(error.statusCode || 500).json({ status: error.statusetext || ERROR, message: "course not found", code : error.statusCode || 500 , data: null });
});
app.listen(process.env.PORT || 4000, () => {
        console.log('listening on port ' + (process.env.PORT || 4000))
})
