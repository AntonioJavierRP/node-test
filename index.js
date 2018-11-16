const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());    // Para parsear el json object.

var courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.get('/', (req,res) => {
    res.send('Hello World!!!!');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
})

app.post('/api/courses', (req,res) => {
    const {error} = validateCourse(req.body);

    if(error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})


// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');
    res.send(course);
}); //:id define un parametro id (id es el nombre del parametro)

// PORT
const port = process.env.PORT || 3000;  // Environment variable PORT (set on temrminal, if it doesnt exists it uses 3000)
app.listen(port, () => console.log(`Listening on port ${port}...`));    // use `` instead of '' so we can use template string $()

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');

    const {error} = validateCourse(req.body);

    if(error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

 // Usamos Joi para que todas las condiciones de la estructura estén en un mismo sitio y no repetir código
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// para poder testear
module.exports = app;