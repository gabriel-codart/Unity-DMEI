import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/user';

// Repositorio de Usuários
let users: User[] = [];

// Busca todos os Usuários
export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ users });
};

// Busca Usuário pelo ID
export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  reply.send({ user: users[Number(id)] });
};

// Cria Usuário
export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = request.body as { name: string, email: string, password: string };

  users.push(new User((users.length), name, email, password));
  
  reply.send(`User ${name} CREATED`);
};

// Atualiza Usuário
export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { name, email, password } = request.body as { name: string, email: string, password: string };

  users[Number(id)] = new User(Number(id), name, email, password);
  
  reply.send(`User ${id} UPDATED`);
};

// Deleta Usuário
export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  users.splice(Number(id), 1);
  
  reply.send(`User ${id} DELETED`);
};