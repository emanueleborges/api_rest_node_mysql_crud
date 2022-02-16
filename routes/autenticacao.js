const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) =>{
    try {
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.email = decode;
        next();
        return res.status(200).send('Ok');
    } catch (error){
        return res.status(401).send({ mensagem: error })
    }
}