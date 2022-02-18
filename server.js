const http =  require('http');
const app  = require('./app');
const port = process.env.PORT || 3000;
//const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Servidor Rodando: http://localhost:${port}`);
});
