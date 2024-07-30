import { FastifyRequest, FastifyReply } from 'fastify';

export const getHome = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send('Hello World!');
};
