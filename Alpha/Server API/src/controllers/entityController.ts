import { Request, Response } from 'express';
import db from '../config/db';

// Controlador para obter todos as entidades
export const getAll = (req: Request, res: Response) => {
  db.query("SELECT * FROM entity",
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

// Controlador para obter uma entidade pelo ID
export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  db.query(`SELECT * FROM entity WHERE id = ?`, id, 
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

// Controlador para criar uma nova entidade
export const create = (req: Request, res: Response) => {
  const { code, name, phone, name_manager, phone_manager, id_zone_adress,  district_adress, cep_adress, street_adress, number_adress, is_internal } = req.body;

  db.query("INSERT INTO entity (code, name, phone, name_manager, phone_manager, id_zone_adress, district_adress, cep_adress, street_adress, number_adress, is_internal) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
  [code, name, phone, name_manager, phone_manager, id_zone_adress,  district_adress, cep_adress, street_adress, number_adress, is_internal],
  (error,result)=>{
    if(error) {
        //console.log(err)
        res.send(error);
    } else{
        //console.log(result)
        res.status(201).send(result);
    }
  });
};

// Controlador para atualizar uma entidade pelo ID
export const updateById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { code, name, phone, name_manager, phone_manager, id_zone_adress,  district_adress, cep_adress, street_adress, number_adress, is_internal } = req.body;

  db.query("UPDATE entity SET code = ?, name = ?, phone = ?, name_manager = ?, phone_manager = ?, district_adress = ?, cep_adress = ?, number_adress = ?, id_zone_adress = ?, street_adress = ? WHERE id = ?",
  [code, name, phone, name_manager, phone_manager, district_adress, cep_adress, number_adress, id_zone_adress, street_adress, id],
  (error,result)=>{
    if(error) {
        //console.log(err)
        res.send(error);
    } else{
        //console.log(result)
        res.send(result);
    }
  });   
};

// Controlador para excluir uma entidade pelo ID
export const deleteById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  db.query("DELETE FROM entity WHERE id = ?", id,
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
