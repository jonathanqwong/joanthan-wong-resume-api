const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('firebase-functions');
const onSchedule = require("firebase-functions/v2/scheduler");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { handleJwtErrors }  = require('../configuration/auth');
const { ORIGIN} = require("../configuration/configs");
const devOrigin = 'http://localhost:3000';

const index = express();
const port = 3000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30 // limit each IP to 100 requests per windowMs
});
const corsOptions =  {
    origin: [ORIGIN,devOrigin],  // This allows all origins. Replace '*' with your specific domain in production.
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


// Scheduled function to run every week
// exports.scheduledFunctions = functions.pubsub.schedule('every monday 00:00').timeZone('UTC').onRun(async (context) => {
exports.scheduledFunctions = functions.pubsub.schedule('every 5 minutes').timeZone('UTC').onRun(async (context) => {
    try {
        const response = await axios.get(`${devOrigin}/skills`);
        const data = response.data;

        // Process the data as needed
        console.log('API call successful:', data);

        return null;
    } catch (error) {
        console.error('API call failed:', error);
        throw new Error('API call failed');
    }
});

// export api and use functions. Refer to package.json npmn run deploy.
exports.api = functions.https.onRequest(index);
