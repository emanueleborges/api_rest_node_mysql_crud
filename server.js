const http = require('http');
const app  = require('./src/app');
const port = process.env.PORT || 3000;
const { sequelize } = require('./src/models')
const server = http.createServer(app);
sequelize.sync().then(() => {
    server.listen(port, () => {
        console.log(`Servidor Rodando: http://localhost:${port}`);
    })
});
