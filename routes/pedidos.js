const express = require('express');
const router  = express.Router();
const autenticacao  = require('./autenticacao');
const PedidosController = require ('../controller/controller_pedidos')

router.get('/',                           PedidosController.SelectPedidos);
router.get('/:idpedidos',                 PedidosController.SelectUmPedidos);
router.post('/',            autenticacao, PedidosController.InsertPedidos);
router.patch('/',           autenticacao, PedidosController.UpdatePedidos);
router.delete('/',          autenticacao, PedidosController.DeletePedidos);

module.exports = router;