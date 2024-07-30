import { FastifyInstance } from 'fastify';

import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.ts';

export default async function usersRoutes(server: FastifyInstance) {
  server.get('/users', {
    schema: {
      description: 'Get all Users',
      tags: ['Users'],
    }
  }, getUsers);

  server.get('/users/:id', {
    schema: {
      description: 'Get User by ID',
      tags: ['Users'],
    }
  }, getUserById);

  server.post('/users', {
    schema: {
      description: 'Create User',
      tags: ['Users'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['name', 'email', 'password']
      }
    }
  }, createUser);

  server.put('/users/:id', {
    schema: {
      description: 'Update User',
      tags: ['Users'],
    }
  }, updateUser);

  server.delete('/users/:id', {
    schema: {
      description: 'Delete User',
      tags: ['Users'],
    }
  }, deleteUser);
}
