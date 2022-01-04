const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;
const bcrypt = require('bcrypt');


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) =>{ 
        if (error){ return res.status(500).send({ error: error});}
            conn.query('select * from usuarios where email = ?', 
            [req.body.email], (error, results) =>{
            if (error){ return res.status(500).send({ error: error }); }
            if (results.length > 0){res.status(401).send({ error: 'usuario ja cadastrado'}); }
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
    mysql.getConnection(
        (error, conn) =>{ 
        if (error){ return res.status(500).send({ error: error}) }
            const sql = 'select * from usuarios where email = ?';
            conn.query(sql,[req.body.email], (error, results, fields) =>{
                conn.release();
                if (error){ return res.status(500).send({ error: error }) }
                if (results.length < 1){ return res.status(401).send({ error: 'Falha na Autenticação 0'}) }
                bcrypt.compare(req.body.senha, results[0].senha, (err, result) =>{
                if (err){ return res.status(401).send({ error: 'Falha na Auatenticacao 1.' }) }
                if (result){ return res.status(200).send({ error: 'Autenticado com sucesso' }) }
                return res.status(401).send({ error: 'Falha na Autenticacao 2.' });
            });
        });         
    });
})

module.exports = router;