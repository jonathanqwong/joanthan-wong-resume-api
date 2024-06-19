const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('firebase-functions');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { handleJwtErrors }  = require('../configuration/auth');
const { ORIGIN} = require("../configuration/configs");
const devOrigin = 'http://localhost:3000';

const index = express();
const port = 3000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 75 // limit each IP to 100 requests per windowMs
});
const corsOptions =  {
    origin: `${ORIGIN},${devOrigin}`,  // This allows all origins. Replace '*' with your specific domain in production.
    methods: 'GET,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Import controllers
const { contactController } = require('./routes/contact');
const { certificationsController } = require('./routes/certifications');
const { educationController } = require('./routes/education');
const { experiencesController } = require('./routes/experiences');
const { skillsController } = require('./routes/skills');

index.use(handleJwtErrors);
index.use(bodyParser.json());
index.use(cors(corsOptions));
index.use(express.json());
index.use(helmet());
index.use(limiter);

index.post('/contact', contactController.postContact);
index.get('/certifications', certificationsController.getCertifications);
index.get('/education', educationController.getEducation);
index.get('/experiences', experiencesController.getExperiences);
index.get('/skills', skillsController.getSkills);

index.use(function(err, req, res, next){
    console.error(err.stack);
    return handleJwtErrors(err, req, res, next);
});

index.listen(port, () => {
    console.log(`Example app listening on ${port}`)
});

// export api and use functions. Refer to package.json npmn run deploy.
exports.api = functions.https.onRequest(index);
