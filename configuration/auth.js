const handleJwtErrors = (err, req, res, next) => {
    next(err);
};

module.exports = { handleJwtErrors };
