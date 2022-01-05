
const mysql   = require('../mysql').conn;

exports.SelectPedidos  = (req, res, next) =>{
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
}

exports.SelectUmPedidos = (req, res, next ) => {
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
}

exports.InsertPedidos = (req, res, next ) => {
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
}

exports.UpdatePedidos = (req, res, next ) => {
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
}

exports.DeletePedidos = (req, res, next ) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query(`DELETE from PEDIDOS where idpedidos = ? ;`, 
        [req.body.idpedidos],
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
}