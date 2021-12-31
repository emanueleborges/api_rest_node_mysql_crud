const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;

// select todos produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET produtos'
    });
});

// insert um produtos
router.post('/', (req, res, next) => {
    console.log (req.body.nome, req.body.preco );
    mysql.getConnection((error, conn) =>{ 
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?,?)', 
        [req.body.nome, req.body.preco],  
        (error, resultado, field) =>{
                conn.release();
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: 'POST produtos insert',
                    idproduto: resultado.idproduto
                });
            }
        )
    })
   
});


// alterar um produtos
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST produtos patch'
    });
});
// delete um produtos
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST produtos delete'
    });
});


// select um produtos
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id === '1'){
        res.status(200).send({
            mensagem: 'GET produtos id 1',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'GET produtos id 2',
            id: id
        });
    }
});


module.exports = router;