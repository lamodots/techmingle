/****
 * unsupoorted (404) routes
 *
 ****/

const notFound = (req,res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

/****
 * Middleware to handle errrors
 *
 ****/

const errorHandler = (error, req, res, next) => {
    if(res.headersSent){
        return next(error)
    }
    res.status(error.code || 500 ).json({mesage: error.message || "An unknown error occured !"})
}

module.exports = { notFound, errorHandler}