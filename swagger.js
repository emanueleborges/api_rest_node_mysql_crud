// gerador automatico de documentacao 
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_auto.json';
const endpointsFiles = ['./src/app.js'];
swaggerAutogen(outputFile, endpointsFiles);