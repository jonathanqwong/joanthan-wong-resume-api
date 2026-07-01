const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('firebase-functions/v1');
const { onSchedule } = require("firebase-functions/v2/scheduler");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const axios = require('axios')
const { handleJwtErrors }  = require('../configuration/auth');
const { ORIGIN, ENDPOINT } = require("../configuration/configs");
const devOrigin = 'http://localhost:3000';

const index = express();
const port = 3000;
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 30,
    message: { error: 'Too many requests, please try again later.' }
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2,
    message: { error: 'Too many contact submissions, please try again later.' }
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

index.post('/contact', contactLimiter, contactController.postContact);
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

// Scheduled function to keep Supabase active (pauses after 7 days inactivity)
exports.weeklyApiJob = onSchedule("0 */24 * * *", async (event) => {
    console.log("This runs 24 hours at 12 AM UTC!");
    try {
        const response = await axios.get(ENDPOINT + '/api/skills')
        const data = JSON.stringify(response.data);

        // Process the data as needed
        console.log('API call response:', response);
        console.log('API call successful:', data);

        return null;
    } catch (error) {
        console.error('API call failed:', error.message);
        console.error('Stack trace:', error.stack);

        return null;
    }
});

// export api and use functions. Refer to package.json npm run deploy.
exports.api = functions.https.onRequest(index);
