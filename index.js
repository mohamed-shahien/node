const express = require('express');
const { body } = require('express-validator');
const coursesController = require('./controllers/controller')

const app = express();
app.use(express.json());
app.get('/api/courss', coursesController.getCours)
app.get('/api/courss/:idcours', coursesController.gatSingleCourse)
app.post('/api/courss',[body('title').notEmpty().withMessage('title is required').isLength({ min: 3 }),body('price').notEmpty().withMessage('price is required')], coursesController.addCourse)

app.patch('/api/courss/:idcours', coursesController.updataCourse)
app.delete('/api/courss/:idcours', coursesController.deleteCourse);

app.listen(5000, () => {
        console.log('listen in port 5000')
})  