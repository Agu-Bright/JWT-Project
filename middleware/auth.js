const CustomAPIError = require('../errors/custom-error')
const JWT = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw CustomAPIError('No token provided', 401)
    }

    var topic;
    var  token;
    [topic, token] = authHeader.split(' ');
    
    try {

        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const {id , username} = decoded;
        req.user = {id, username}
        next()

    } catch (error) {
        throw CustomAPIError('Not Authorixed to access this route', 401)
    }
}

module.exports = authenticationMiddleware