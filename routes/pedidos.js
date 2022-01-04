const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;
const autenticacao  = require('./autenticacao');

// select todos produtos rota sem protecao
router.get('/',  (req, res, next) => {

    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from pedidos inner join produtos on produtos.idproduto = pedidos.idproduto;`, (error, results, fields) =>{
            conn.release();
            if (error){
                results.status(500).json({
                    mensagem: error,
                    response: null
                });
            } else {
                res.status(200).json({
                   mensagem: 'lista de pedidos', 
                   response: results
                });
            }
        });
    });
});
// select todos produtos rota com protecao
router.get('/:idpedidos', autenticacao, (req, res, next) => {
    console.log('idpedidos: ',req.params.idpedido);
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from pedidos  inner join produtos on produtos.idproduto = pedidos.idproduto where idpedidos = ${req.params.idpedidos };`, (error, results, fields) =>{
            conn.release();
            if (error){
                 res.status(500).json({error: error, response: null});
            } else {
                 res.status(200).json({error: null, response: results});
            }
        });
    });
});

// insert um produtos rota com protecao
router.post('/', autenticacao, (req, res, next) => {
    console.log (req.body.nome, req.body.preco );
    mysql.getConnection((error, conn) =>{ 
        
        conn.query(`INSERT INTO pedidos (idproduto, quantidade) VALUES (?,?)`, 
        [req.body.idproduto, req.body.quantidade],  
        (error, resultado, field) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).json({
                    mensagem: 'POST pedidos insert',
                    idproduto: resultado.idpedido
                });
            }
        )
    });
   
});


// alterar um produtos rota com protecao
router.patch('/', autenticacao, (req, res, next) => {
    console.log (req.body.idpedidos,req.body.quantidade );

    mysql.getConnection((error, conn) =>{ 
        conn.query(`UPDATE PEDIDOS set quantidade = ? where idpedidos = ?`, 
        [req.body.quantidade, req.body.idpedidos],
        (error, resultado, field) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).json({
                    mensagem: 'POST pedidos update',
                    idproduto: resultado.idpedidos
                });
            }
        )
    });
});
// delete um produtos rota com protecao
router.delete('/', autenticacao, (req, res, next) => {
    console.log (req.body.idproduto);

    mysql.getConnection((error, conn) =>{ 
        conn.query(`DELETE from PEDIDOS where idpedido = ? ;`, 
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
                    mensagem: 'POST pedido deletado',
                    idproduto: resultado.idpedido
                });
            }
        )
    });
    
});
module.exports = router;