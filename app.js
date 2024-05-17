const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const port = 3000;

const { certificationsController } = require('./routes/certifications');
const { educationController } = require('./routes/education');
const { experiencesController } = require('./routes/experiences');
const { skillsController } = require('./routes/skills');

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/certifications', certificationsController.getCertifications);
app.get('/education', educationController.getEducation);
app.get('/experiences', experiencesController.getExperiences);
app.get('/skills', skillsController.getSkills);

app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
});

// exports.app = functions.https.onRequest(app);
