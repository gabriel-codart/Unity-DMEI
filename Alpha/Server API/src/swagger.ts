import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: 'Unity DMEI',
    description: 'Description'
  },
  host: 'localhost:3030',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {"name": "User"},
    {"name": "Entity"},
    {"name": "Device"},
    {"name": "DeviceType"},
    {"name": "Service"},
    {"name": "Call"}
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./app.ts'];

swaggerAutogen(outputFile, routes, doc);