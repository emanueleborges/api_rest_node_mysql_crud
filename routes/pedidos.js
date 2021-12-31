const express = require('express');
const router  = express.Router();

// select todos pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET pedidos'
    });
});

// insert um pedidos
router.post('/', (req, res, next) => {

    const pedido = {
        id      : req.body.id,
        pedido  : req.body.pedido
    };

    res.status(201).send({
        mensagem: 'POST pedidos',
        pedidoCriado: pedido

    });
});


// alterar um pedidos
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST pedidos patch'
    });
});
// delete um pedidos
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST pedidos delete'
    });
});


// select um pedidos
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id === '1'){
        res.status(200).send({
            mensagem: 'GET pedidos id 1',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'GET pedidos id 2',
            id: id
        });
    }
});


module.exports = router;