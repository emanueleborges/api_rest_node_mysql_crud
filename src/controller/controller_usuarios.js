const mysql  = require('./../config/index');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const sendgmail = require('nodemailer');

exports.EnviarSenhaUsuarios = (req, res, next)=>{
    mysql.getConnection((error, conn) =>{ 
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(`Select * from usuarios where email = ? ;`,
        [req.body.email],
        (error, results) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            if (results) {
                const smtpConfig = sendgmail.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'emanuel.eborges@gmail.com',
                                pass: 'minhasenha'
                            }
                });
                const mailOptions = {
                            from: 'noreply@gmail.com',
                            to: req.body.email,
                            subject: 'Recuperação de Senha',
                            text: 'Teste de envio de email.'
                };
                smtpConfig.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + JSON.stringify(info));
                        return res.status(201).send({ mensagem: 'email enviado com sucesso' });
                    }
                });
            }
        });
    });
}


exports.CadastroUsuarios = (req, res, next)=>{
    mysql.getConnection((error, conn) =>{ 
        if (error){ return res.status(500).send({ error: error}) }
        conn.query('select * from usuarios where email = ?', 
            [req.body.email], (err, results) =>{
            if (err){ 
                return res.status(500).send({ error: err })
            }
            if (results.length > 0){ 
                return res.status(401).send({ error: 'usuario ja cadastrado'}) 
            }
        });

        bcrypt.hash(req.body.senha, 10, (errcrypt, hash) =>{
            if (errcrypt){ 
                return res.status(500).send({ error: errcrypt }) 
            }
            conn.query('INSERT INTO usuarios (email, senha) VALUES (?,?)', 
            [req.body.email, hash],
            (error, results) => {
                conn.release();
                if (error){
                    return res.status(500).send({ error: errcrypt });
                }
                return res.status(201).send ({ error: 'usuario inserido com sucesso'});
            })
        }) ;         
    });
}

exports.LoginUsuarios = (req, res, next ) => {
    mysql.getConnection((error, conn) => { 
        if (error){ return res.status(500).send({ error: error}) }
            const query = 'select * from usuarios where email = ?;';
            conn.query(query,[req.body.email], (error, results) => {
                conn.release();
                if (error){ 
                    return res.status(500).send({ error: error }) 
                }
                if (results.length < 1){ 
                    return res.status(401).send({ mensagem: 'Falha na Autenticação 1.'}) 
                }
                bcrypt.compare(req.body.senha,results[0].SENHA, 
                    (err, result)=> {
                        if (err) {  return res.status(404).send({ mensagem: 'Falha na Autenticacao 2.' }) }
                        if (result) {
                            const token = jwt.sign({
                                idusuarios : results[0].idusuarios,
                                email: results[0].email,
                                }, 
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "1h"
                                }
                            );
                            return res.status(200).send({ mensagem: 'Autenticado com sucesso.' , token: token  })
                        } else {
                            return res.status(404).send({ mensagem: 'Falha na Autenticacao 3.' })
                        }
                    }
                );
        });         
    });
}