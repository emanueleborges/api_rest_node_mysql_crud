const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;
const autenticacao  = require('./autenticacao');

// select todos produtos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) =>{ 
        conn.query('select * from produtos;', (error, results, fields) =>{
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

router.get('/:idproduto',   (req, res, next) => {
    console.log('idproduto: ',req.params.idproduto);
    mysql.getConnection((error, conn) =>{ 
        conn.query('select * from produtos where idproduto = ${req.params.idproduto };', (error, results, fields) =>{
            conn.release();
            if (error){
                 res.status(500).json({error: error, response: null});
            } else {
                 res.status(200).json({error: null, response: results});
            }
        });
    });
});

// insert um produtos
router.post('/', autenticacao, (req, res, next) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?,?)', 
        [req.body.nome, req.body.preco],  
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
    console.log (req.body.idproduto, req.body.nome, req.body.preco );

    mysql.getConnection((error, conn) =>{ 
        conn.query(`UPDATE produtos set nome = ? , preco = ? where idproduto = ? ;`, 
        [req.body.nome, req.body.preco, req.body.idproduto],
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
                    idproduto: resultado.idproduto
                });
            }
        )
    });
});
// delete um produtos
router.delete('/', autenticacao,  (req, res, next) => {
    console.log (req.body.idproduto);

    mysql.getConnection((error, conn) =>{ 
        conn.query(`delete from produtos where idproduto = ? ;`, 
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