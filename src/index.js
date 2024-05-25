const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('firebase-functions');
const helmet = require('helmet');
const index = express();
const port = 3000;

// Import controllers
const { contactController } = require('./routes/contact');
const { certificationsController } = require('./routes/certifications');
const { educationController } = require('./routes/education');
const { experiencesController } = require('./routes/experiences');
const { skillsController } = require('./routes/skills');

index.use(bodyParser.json());
index.use(cors());
index.use(express.json());
index.use(helmet());

index.get('/', (req, res) => {
    res.send('hello world');
});

index.post('/contact', contactController.postContact);
index.get('/certifications', certificationsController.getCertifications);
index.get('/education', educationController.getEducation);
index.get('/experiences', experiencesController.getExperiences);
index.get('/skills', skillsController.getSkills);

index.listen(port, () => {
    console.log(`Example app listening on ${port}`)
});

// export api and use functions. Refer to package.json npmn run deploy.
exports.api = functions.https.onRequest(index);
