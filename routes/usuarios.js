const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;
const bcrypt = require('bcrypt');


router.post('/cadastro', (req, res, next) => {
    
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
})


router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => { 
        if (error){ return res.status(500).send({ error: error}) }
            const query = 'select * from usuarios where email = ?;';
            conn.query(query,[req.body.email], (error, results) => {
                conn.release();
                if (error){ 
                    return res.status(500).send({ error: error }) 
                }
                if (results.length < 1){ 
                    return res.status(401).send({ mensagem: 'Falha na Autenticação.'}) 
                }
                bcrypt.compare(req.body.senha,results[0].SENHA, (err, result) => {
                    if (err) {
                        throw err
                      } else if (!result) {
                         return res.status(404).send({ mensagem: 'Falha na Autenticacao.' })
                      } else {
                        return res.status(200).send({ mensagem: 'Autenticado com sucesso.' }) 
                      }
            });
        });         
    });
})

module.exports = router;