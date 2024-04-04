import { Request, Response } from 'express';
import db from '../config/db';

// Controlador para obter todos os dispositivos
export const getAll = (req: Request, res: Response) => {
  db.query("SELECT * FROM device",
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

// Controlador para obter um dispositivo pelo ID
export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  db.query(`SELECT * FROM device WHERE id = ?`, id, 
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

// Controlador para criar uma novo dispositivo
export const create = (req: Request, res: Response) => {
  const { num_serial, model, id_type, description, id_entity, is_active } = req.body;

  db.query("INSERT INTO device (num_serial, model, id_type, description, id_entity, is_active) VALUES (?,?,?,?,?,?)",
  [num_serial, model, id_type, description, id_entity, is_active],
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

// Controlador para atualizar um novo dispositivo pelo ID
export const updateById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { num_serial, model, id_type, description, id_entity, is_active } = req.body;

  db.query("UPDATE device SET num_serial = ?, model = ?, id_type = ?,  description = ?, id_entity = ?, is_active = ? WHERE id = ?",
  [num_serial, model, id_type, description, id_entity, is_active, id],
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

// Controlador para excluir um dispositivo pelo ID
export const deleteById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  db.query("DELETE FROM device WHERE id = ?", id,
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
