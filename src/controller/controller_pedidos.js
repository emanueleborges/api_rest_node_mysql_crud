const mysql  = require('./../config/index');

exports.SelectPedidos = (req, res) =>{
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select
        pedidos.idpedidos,
        pedidos.idproduto,
        sum(pedidos.quantidade) quantidade ,
        round(sum(pedidos.quantidade * produtos.preco),2) total,
        produtos.nome,
        produtos.preco
    from
        pedidos
    inner join produtos on
        produtos.idproduto = pedidos.idproduto
    group by pedidos.idproduto
    order by
        4;`, 
        (error, results, fields) =>{
        conn.release();
            if (error){
                res.status(500).json({data: error});
            } else {
                res.status(200).json({data: results});
                console.log('Lista de Pedidos: ', results)
            }
        });
    });
}

exports.SelectUmPedidos = (req, res) => {
    console.log('idpedidos: ',req.params.idpedido);
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from pedidos inner join produtos on produtos.idproduto = pedidos.idproduto where idpedidos = ${req.params.idpedido };`, (error, results) =>{
            conn.release();
            if (error){
                res.status(500).json({error: error, response: null});
            } else {
                res.status(200).json({data: results});
            }
        });
    });
}

exports.InsertPedidos = (req, res) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query(`INSERT INTO pedidos (idproduto, quantidade) VALUES (?,?)`, 
        [req.body.idproduto, req.body.quantidade],  
            (error, results) =>
            {
                conn.release();
                if (error){
                    return res.status(500).send({error: error, response: null});
                } else {
                    res.status(200).send({mensagem: 'POST pedidos insert',data: results});
                }
            }
        )
    });
}

exports.UpdatePedidos = (req, res) => {
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

exports.DeletePedidos = (req, res) => {
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