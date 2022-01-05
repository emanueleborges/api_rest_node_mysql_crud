const express   = require('express');
const router    = express.Router();
const UsuariosController = require ('../controller/controller_usuarios');

router.post('/cadastro', UsuariosController.CadastroUsuarios);
router.post('/login', UsuariosController.LoginUsuarios);

module.exports = router;