// gerador automatico de documentacao 
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger_auto.json';
const endpointsFiles = ['./app.js'];
swaggerAutogen(outputFile, endpointsFiles);