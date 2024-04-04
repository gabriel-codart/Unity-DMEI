import { Request, Response } from 'express';
import db from '../config/db';

// Controlador para obter todos os chamados
export const getAll = (req: Request, res: Response) => {
  db.query("SELECT * FROM `call`",
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

// Controlador para obter um chamado pelo id
export const getById = (req: Request, res: Response) => {
  const { num_id, year_id } = req.params;

  db.query("SELECT * FROM `call` WHERE num_id LIKE ? AND year_id LIKE ?",
  [num_id, year_id],
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

// Adicionando Usuários(Técnicos)
function addUsers(num_id: string, year_id: string, users: []) {
  for (let count = 0; count < users.length; count++) {
    db.query("INSERT INTO call_user (id_call_num, id_call_year, id_user) VALUES (?,?,?)",
    [num_id, year_id, users[count]]);
  }
}

// Adicionando Dispositivos
function addDevices(num_id: string, year_id: string, devices: []) {
  for (let count = 0; count < devices.length; count++) {
    db.query("INSERT INTO call_device (id_call_num, id_call_year, id_device) VALUES (?,?,?)",
    [num_id, year_id, devices[count]]);
  }
}

// Controlador para criar um novo chamado
export const create = (req: Request, res: Response) => {
  const { is_internal, id_entity, name_requester, phone_requester, problem, created_by, schedule_at, devices } = req.body;

  const currentYear = new Date().getFullYear();

  db.query("SELECT MAX(num_id) AS max_num_id FROM `call` WHERE year_id = ?", [currentYear], (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }

    const maxNumId = result[0].max_num_id || 0;
    const newNumId = maxNumId + 1;

    // Array de promessas para cada criação
    const createPromises = [];

    // Cria a Call
    createPromises.push(new Promise((resolve, reject) => {
      db.query("INSERT INTO `call` (year_id, num_id, is_internal, id_entity, name_requester, phone_requester, problem, created_by, created_at, schedule_at) VALUES (?,?,?,?,?,?,?,?,NOW(),?)",
      [currentYear, newNumId, is_internal, id_entity, name_requester, phone_requester, problem, created_by, schedule_at],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }));

    // Adiciona os Devices
    for (let count = 0; count < devices.length; count++) {
      createPromises.push(new Promise((resolve, reject) => {
        db.query("INSERT INTO call_device (id_call_year, id_call_num, id_device) VALUES (?,?,?)",
        [currentYear, newNumId, devices[count]],
        (error,result)=>{
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }));
    };
    
    // Executa todas as promessas simultaneamente
    Promise.all(createPromises)
    .then((results) => {
      // Todas as operações de exclusão foram bem-sucedidas
      res.status(201).send(results);
    })
    .catch((error) => {
      // Um erro ocorreu em pelo menos uma operação de exclusão
      console.error(error);
      res.status(500).send('Erro ao criar serviço');
    });
  });
};

// Controlador para atualizar um chamado pelo ID
export const updateById = (req: Request, res: Response) => {
  const { num_id, year_id } = req.params;
  const { is_internal, id_entity, name_requester, phone_requester, problem, summary, doc_path, created_by, created_at, schedule_at, ended_at, is_closed } = req.body;

  db.query("UPDATE `call` SET is_internal = ?, id_entity = ?, name_requester = ?, phone_requester = ?, problem = ?, summary = ?, doc_path = ?, created_by = ?, created_at = ?, schedule_at = ?, ended_at, is_closed = ? WHERE num_id LIKE ? AND year_id LIKE ?",
  [is_internal, id_entity, name_requester, phone_requester, problem, summary, doc_path, created_by, created_at, schedule_at, ended_at, is_closed, num_id, year_id],
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

// Controlador para finalizar um chamado pelo ID
export const finalizeById = (req: Request, res: Response) => {
  const { num_id, year_id } = req.params;
  const { summary, devices, users } = req.body;
  
  // Array de promessas para cada criação
  const finalizePromises = [];

  // Adiciona os Users
  for (let count = 0; count < users.length; count++) {
    finalizePromises.push(new Promise((resolve, reject) => {
      db.query("INSERT INTO call_user (id_call_year, id_call_num, id_user) VALUES (?,?,?)",
      [year_id, num_id, users[count]],
      (error,result)=>{
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }));
  };

  // Adiciona os Devices
  for (let count = 0; count < devices.length; count++) {
    finalizePromises.push(new Promise((resolve, reject) => {
      db.query("INSERT INTO call_device (id_call_year, id_call_num, id_device) VALUES (?,?,?)",
      [year_id, num_id, devices[count]],
      (error,result)=>{
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }));
  };

  // Finaliza a Call
  finalizePromises.push(new Promise((resolve, reject) => {
    db.query("UPDATE `call` SET summary = ?, ended_at = NOW(), is_closed = TRUE WHERE num_id LIKE ? AND year_id LIKE ?",
    [summary, num_id, year_id],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));

  // Executa todas as promessas simultaneamente
  Promise.all(finalizePromises)
  .then((results) => {
    // Todas as operações de exclusão foram bem-sucedidas
    res.status(201).send(results);
  })
  .catch((error) => {
    // Um erro ocorreu em pelo menos uma operação de exclusão
    console.error(error);
    res.status(500).send('Erro ao finalizar serviço');
  });
};

// Controlador para excluir um chamado pelo ID
export const deleteById = (req: Request, res: Response) => {
  const { num_id, year_id } = req.params;

  // Array de promessas para cada exclusão
  const deletePromises = [];

  // Adicionando as promessas de exclusão ao array
  deletePromises.push(new Promise((resolve, reject) => {
    db.query("DELETE FROM call_user WHERE id_call_num LIKE ? AND id_call_year LIKE ?",
    [num_id, year_id],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));

  deletePromises.push(new Promise((resolve, reject) => {
    db.query("DELETE FROM call_device WHERE id_call_num LIKE ? AND id_call_year LIKE ?",
    [num_id, year_id],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));

  deletePromises.push(new Promise((resolve, reject) => {
    db.query("DELETE FROM `call` WHERE num_id LIKE ? AND year_id LIKE ?",
    [num_id, year_id],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));

  // Executa todas as promessas simultaneamente
  Promise.all(deletePromises)
  .then((results) => {
    // Todas as operações de exclusão foram bem-sucedidas
    res.status(200).send(results);
  })
  .catch((error) => {
    // Um erro ocorreu em pelo menos uma operação de exclusão
    console.error(error);
    res.status(500).send('Erro ao excluir serviço');
  });
};
