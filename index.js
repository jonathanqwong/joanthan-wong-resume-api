const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const index = express();
const port = 3000;

const { certificationsController } = require('./routes/certifications');
const { educationController } = require('./routes/education');
const { experiencesController } = require('./routes/experiences');
const { skillsController } = require('./routes/skills');

index.use(express.json());
index.use(cors());
index.use(helmet());

index.get('/', (req, res) => {
    res.send('hello world');
});

index.get('/certifications', certificationsController.getCertifications);
index.get('/education', educationController.getEducation);
index.get('/experiences', experiencesController.getExperiences);
index.get('/skills', skillsController.getSkills);

index.listen(port, () => {
    console.log(`Example app listening on ${port}`)
});

// exports.index = functions.https.onRequest(index);
