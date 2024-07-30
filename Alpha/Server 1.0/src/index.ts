import Fastify from 'fastify';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import autoload from '@fastify/autoload';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const PORT = 2020;
const server = Fastify();

// Resolve o caminho absoluto da pasta routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesDir = resolve(__dirname, './routes');

// Registro do Swagger
server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API Documentation',
        description: 'API Documentation with Swagger',
        version: '1.0.0'
      },
      servers: [{ url: `http://localhost:${PORT}` }]
    }
  });
  
server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next(); },
      preHandler: function (request, reply, next) { next(); }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true
});
  
// Registro do Autoload
server.register(autoload, {
    dir: routesDir,
    options: { prefix: '/api' }
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`)
});