const jwt = require('jsonwebtoken');
module.exports = ( req, res, next ) =>{
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.email = decode;
    next();
}