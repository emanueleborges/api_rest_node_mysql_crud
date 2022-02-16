const mysql   = require('../mysql').conn;

exports.SelectProdutos = (req, res)=>{
   
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from produtos;`, (error, results, fields) =>{
            conn.release();
            if (error){
                res.status(500).json({data: error});
            } else {
                res.status(200).json({data: results});
                console.log('Lista de Produtos: ', results)
            }
        });
    });
}

exports.SelectUmProdutos = (req, res)=>{
    mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from produtos where idproduto = ${req.params.idproduto};`,
            (error, results) => {
            conn.release();
            if (error){
                 res.status(500).json({response: null});
            } else {
                 res.status(200).json({response: results});
            }
        });
    });
}

exports.InsertProdutos = (req, res) =>{
    mysql.getConnection((error, conn) =>{ 
        conn.query(`INSERT INTO produtos (nome, preco) VALUES (?,?)`, [req.body.nome, req.body.preco],
        (error, results) => {
            conn.release();
            if (error) {
                res.status(500).send({ data: error });
            } else {
                res.status(200).send({ mensagem: 'POST produto insert', data: results });
            }
        });
    });
}

exports.UpdateProdutos = (req, res ) => {
    mysql.getConnection((error, conn) =>{ 
        conn.query(`UPDATE produtos set nome = ? , preco = ? , userid = ? where idproduto = ? ;`, 
        [req.body.nome, req.body.preco, req.email.idusuarios, req.body.idproduto ],
        (error, results) =>{
                conn.release();
                if (error){
                    res.status(500).send({data: error});
                } else {
                    res.status(200).send({mensagem: 'POST produto update', data: results});
                }
            }
        )
    });
}

exports.DeleteProdutos = (req, res, next )=>{
    mysql.getConnection((error, conn) =>{ 
        conn.query(`DELETE from PRODUTOS where idproduto = ? ;`, 
        [req.body.idproduto],
        (error, results) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                } else {
                    res.status(200).send({
                        mensagem: 'POST produto deletado',
                        idproduto: results.idproduto
                    });
                }
            }
        )
    });
}