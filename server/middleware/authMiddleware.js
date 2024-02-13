const jwt = require('jsonwebtoken')
const AppError = require('../models/errorModel')

const authMiddleware = async (req, res, next)=> {
    const Authorization = req.headers.Authorization || req.headers.authorization;

    if(Authorization && Authorization.startsWith("Bearer")) {

        const token = Authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, info)=> {
            if(err){
                return next(new AppError("Unathorized. Invalid token.", 403));
            }
            
            req.user = info;
            next();
        })
    }
    else {
        return next(new AppError("Unathorized. No token.", 402));
    }


}

module.exports = authMiddleware;

