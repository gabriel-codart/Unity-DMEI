import { FastifyInstance } from 'fastify';

import { getHome } from '../controllers/home.ts';

export default async function homeRoutes(server: FastifyInstance) {
  server.get('/', {
    schema: {
      description: 'Get Home',
      tags: ['Home'],
    }
  }, getHome);
}
