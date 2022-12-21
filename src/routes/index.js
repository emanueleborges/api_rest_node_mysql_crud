const express = require('express')
const router = express.Router()
const rotaProdutos  = require('./../routes/produtos');
const rotaPedidos   = require('./../routes/pedidos');
const rotaUsuarios  = require('./../routes/usuarios');
router.use('/produtos',rotaProdutos);
router.use('/pedidos' ,rotaPedidos);
router.use('/usuarios',rotaUsuarios);
module.exports = router
