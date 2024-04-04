import { Request, Response } from 'express';
import db from '../config/db';

// Controlador para obter todos os tipos de dispositivo
export const getAll = (req: Request, res: Response) => {
  db.query("SELECT * FROM type_device",
  (error,result)=>{
    if(error) {
      //console.log(err)
      res.send(error)
    } else {
      //console.log(result)
      res.send(result)
    }
  });
};

// Controlador para obter um tipo de dispositivo pelo ID
export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  db.query(`SELECT * FROM type_device WHERE id = ?`, id, 
  (error,result)=>{
    if(error) {
        //console.log(err)
        res.send(error)
    } else {
        //console.log(result)
        res.send(result)
    }
  });
};

// Controlador para criar um novo tipo de dispositivo
export const create = (req: Request, res: Response) => {
  const { name } = req.body;

  db.query("INSERT INTO type_device (name) VALUES (?)",
  [name],
  (err,result)=>{
    if(err) {
        //console.log(err);
        res.send(err);
    } else{
        //console.log(result);
        res.send(result);
    }
  });
};

// Controlador para atualizar um tipo de dispositivo pelo ID
export const updateById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  db.query("UPDATE type_device SET name = ? WHERE id = ?",
  [name, id],
  (err,result)=>{
    if(err) {
        //console.log(err);
        res.send(err);
    } else{
        //console.log(result);
        res.send(result);
    }
  });  
};

// Controlador para excluir um tipo de dispositivo pelo ID
export const deleteById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  db.query("DELETE FROM type_device WHERE id = ?", id,
  (error,result)=>{
    if(error) {
        //console.log(err)
        res.send(error)
    } else {
        //console.log(result)
        res.send(result)
    }
  });
};
