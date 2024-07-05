import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db';

// Controlador para obter todos os usuários
export const getAll = (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  db.query("SELECT * FROM user",
  (error,result)=>{
    if(error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
};

// Controlador para obter um usuário pelo ID
export const getById = (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  const id = Number(req.params.id);

  db.query(`SELECT * FROM user WHERE id = ?`, id, 
  (error,result)=>{
    if(error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
};

// Controlador para realizar o login do usuário
export const login = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  const { username, password } = req.body;

  try {
    // Busca o hash da senha correspondente ao username fornecido
    db.query("SELECT id, username, password, realname FROM user WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          res.status(500).send(error);
        } else {
          if (results.length === 0) {
            // Usuário não encontrado
            res.status(401).send('Usuário não encontrado');
          } else {
            const user = results[0];
            const hashedPassword = user.password;

            // Compara a senha fornecida com o hash da senha armazenada no banco de dados
            const match = bcrypt.compareSync(password, hashedPassword);

            if (match) {
              // Senha correta
              res.status(200).json({ id: user.id, username: user.username, realname: user.realname });
            } else {
              // Senha incorreta
              res.status(401).send('Usuário ou Senha incorretos');
            }
          }
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao realizar login');
  }
};

// Controlador para criar um novo usuário
export const create = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  const { username, password, realname } = req.body;

  try {
    // Gera o hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO user (username, password, realname) VALUES (?,?,?)",
    [username, hashedPassword, realname],
    (error,result)=>{
      if(error) {
        res.status(500).send(error);
      } else{
        res.status(201).send(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário');
  }
};

// Controlador para atualizar um usuário pelo ID
export const updateById = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']

  const id = Number(req.params.id);
  const { username, password, realname } = req.body;

  try {
    // Gera o hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query("UPDATE user SET username = ?, password = ?, realname = ? WHERE id = ?",
    [username, hashedPassword, realname, id],
    (error,result)=>{
      if(error) {
        res.send(error);
      } else{
        res.send(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar usuário');
  }
};

// Controlador para excluir um usuário pelo ID
export const deleteById = (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  
  const id = Number(req.params.id);

  db.query("DELETE FROM user WHERE id = ?", id,
  (error,result)=>{
    if(error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
};
