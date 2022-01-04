const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) =>{
    try {
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.email = decode;
        next();
    } catch (error){
        return res.status(401).send({ mensagem: error })
    }
}