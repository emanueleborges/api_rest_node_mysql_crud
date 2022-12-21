const mysql  = require('./../config/index');

exports.SelectProdutos = async (req, res)=>{
    await mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from produtos;`, (error, results, fields) =>{
            conn.release();
            if (error){
                res.status(500).json({data: error});
            } else {
                res.status(200).json({data: results});
            }
        });
    });
}

exports.SelectUmProdutos = async (req, res)=>{
    await mysql.getConnection((error, conn) =>{ 
        conn.query(`select * from produtos where idproduto = ${req.params.idproduto};`,
            (error, results) => {
            conn.release();
            if (error){
                 res.status(500).json({response: null});
            } else {
                res.status(200).json({ response: results });
            }
        });
    });
}

exports.InsertProdutos = async (req, res) =>{
    await mysql.getConnection((error, conn) =>{ 
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

exports.UpdateProdutos = async (req, res) => {
    await mysql.getConnection((error, conn) =>{ 
        conn.query(`UPDATE produtos set nome = ? , preco = ? , userid = ? where idproduto = ? ;`, 
        [req.body.nome, req.body.preco, req.email.idusuarios, req.body.idproduto ],
        (error, results) =>{
            conn.release();
            console.log('error: ', error, 'results: ', results);
            if (error){
               res.status(500).send({data: error});
            } else {
                if (results.affectedRows == 0) {
                    res.status(200).send({ status: 1, mensagem: 'POST produto update não encontrado'});
                } else {
                    res.status(200).send({ status: 1, mensagem: 'POST produto update. ok '});
                }
            }
        });
    });
}

exports.DeleteProdutos = async(req, res, next )=>{
    mysql.getConnection((error, conn) =>{ 
        conn.query(`DELETE from PRODUTOS where idproduto = ? ;`,
            [req.body.idproduto],
            (error, results) => {
                conn.release();
                if (error) {
                    return res.status(500).send({error: error,response: null});
                } else {
                    if (results.affectedRows == 0) {
                        res.status(200).send({ status: 1, mensagem: 'POST produto deletado não encontrado'});
                    } else {
                        res.status(200).send({ status: 1, mensagem: 'POST produto deletado. ok '});
                    }
                }
        });
    });
}