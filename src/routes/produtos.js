const express               = require('express');
const router                = express.Router();
const autenticacao          = require('./autenticacao');
const ProdutosController    = require ('../controller/controller_produtos')
const multer                = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
}); 
const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);
    }
};
const upload  = multer({ storage: storage, fileFilter: fileFilter });
//rotas 
router.get('/',                                         ProdutosController.SelectProdutos);
router.get('/:idproduto',                               ProdutosController.SelectUmProdutos);
router.post('/',                          autenticacao, ProdutosController.InsertProdutos);
router.patch('/', upload.single('imagem'),autenticacao, ProdutosController.UpdateProdutos);
router.delete('/',                        autenticacao, ProdutosController.DeleteProdutos);

module.exports = router;