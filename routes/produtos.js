const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').conn;
const autenticacao  = require('./autenticacao');
const ProdutosController = require ('../controller/controller_produtos')

router.get('/',                           ProdutosController.SelectProdutos);
router.get('/:idproduto',                 ProdutosController.SelectUmProdutos);
router.post('/',            autenticacao, ProdutosController.InsertProdutos);
router.patch('/',           autenticacao, ProdutosController.UpdateProdutos);
router.delete('/',          autenticacao, ProdutosController.DeleteProdutos);

module.exports = router;