// tasks.js (Express route)
const { auth } = require('express-oauth2-jwt-bearer');
const { AUDIENCE, ISSUER_BASE_URL} = require("../configuration/configs");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: AUDIENCE,
    issuerBaseURL: ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

// Error handling for JWT
const handleJwtErrors = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // Custom error response for unauthorized requests
        res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Unauthorized.'
        });
    } else {
        next(err);
    }
};

module.exports = { checkJwt, handleJwtErrors };
