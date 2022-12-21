const express   = require('express');
const router    = express.Router();
const UsuariosController = require ('../controller/controller_usuarios');
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

router.post('/cadastro',  upload.single('imagem'),UsuariosController.CadastroUsuarios);
router.post('/login', UsuariosController.LoginUsuarios);
router.post('/enviarsenha', UsuariosController.EnviarSenhaUsuarios);

module.exports = router;