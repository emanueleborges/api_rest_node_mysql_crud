const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;
const autenticacao  = require('./autenticacao');

// select todos produtos
router.get('/', autenticacao, (req, res, next) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from produtos;`, (error, results, fields) =>{
            conn.release();
            if (error){
                results.status(500).json({
                    error: error,
                    response: null
                });
            } else {
                res.status(200).json({
                   error: null, 
                   response: results
                });
            }
        });
    });
});

router.get('/:idproduto',  autenticacao, (req, res, next) => {
    console.log ('idusuarios logado: ', req.email.idusuarios)
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from produtos where idproduto = ${req.params.idproduto};`, (error, results, fields) =>{
            conn.release();
            if (error){
                 res.status(500).json({response: null});
            } else {
                 res.status(200).json({response: results});
            }
        });
    });
});

// insert um produtos
router.post('/', autenticacao, (req, res, next) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query(`INSERT INTO produtos (nome, preco, userid) VALUES (?,?,?)`, 
        [req.body.nome, req.body.preco, req.email.idusuarios],  
        (error, resultado, field) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).json({
                    mensagem: 'POST produtos insert',
                    idproduto: resultado.idproduto
                });
            }
        )
    });
   
});


// alterar um produtos
router.patch('/', autenticacao, (req, res, next) => {
    console.log (req.body.nome, req.body.preco, req.email.idusuarios, req.body.idproduto )
    mysql.getConnection((error, conn) =>{ 
        conn.query(`UPDATE produtos set nome = ? , preco = ? , userid = ? where idproduto = ? ;`, 
        [req.body.nome, req.body.preco, req.email.idusuarios, req.body.idproduto ],
        (error, resultado, field) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).json({
                    mensagem: 'POST produto update',
                    idproduto: req.body.idproduto
                });
            }
        )
    });
});
// delete um produtos
router.delete('/', autenticacao,  (req, res, next) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query(`DELETE from PRODUTOS where idproduto = ? ;`, 
        [req.body.idproduto],
        (error, resultado, field) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).json({
                    mensagem: 'POST produto deletado',
                    idproduto: resultado.idproduto
                });
            }
        )
    });
    
});

module.exports = router;