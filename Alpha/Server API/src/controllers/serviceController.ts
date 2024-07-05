import { Request, Response } from 'express';
import db from '../config/db';

// Controlador para obter todos as serviços
export const getAll = (req: Request, res: Response) => {
  // #swagger.tags = ['Service']

  db.query("SELECT * FROM service",
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

// Controlador para obter uma serviço pelo ID
export const getById = (req: Request, res: Response) => {
  // #swagger.tags = ['Service']

  const { num_id, year_id } = req.params;

  db.query(`SELECT * FROM service WHERE num_id LIKE ? AND year_id LIKE ?`,
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

// Controlador para criar uma nova serviço
export const create = (req: Request, res: Response) => {
  // #swagger.tags = ['Service']

  const { id_entity, name_requester, phone_requester, problem, created_by, devices } = req.body;
  const currentYear = new Date().getFullYear();

  db.query("SELECT MAX(num_id) AS max_num_id FROM service WHERE year_id = ?", [currentYear], (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }

    const maxNumId = result[0].max_num_id || 0;
    const newNumId = maxNumId + 1;

    // Array de promessas para cada criação
    const createPromises = [];

    // Cria o Service
    createPromises.push(new Promise((resolve, reject) => {
      db.query("INSERT INTO service (year_id, num_id, id_entity, name_requester, phone_requester, problem, created_by, created_at) VALUES (?,?,?,?,?,?,?,NOW())",
      [currentYear, newNumId, id_entity, name_requester, phone_requester, problem, created_by],
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
        db.query("INSERT INTO service_device (id_service_year, id_service_num, id_device) VALUES (?,?,?)",
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

// Controlador para atualizar uma serviço pelo ID
export const updateById = (req: Request, res: Response) => {
  // #swagger.tags = ['Service']

  const { num_id, year_id } = req.params;
  const { name_requester, phone_requester, problem, summary } = req.body;

  db.query("UPDATE service SET name_requester = ?, phone_requester = ?, problem = ?, summary = ? WHERE num_id LIKE ? AND year_id LIKE ?",
  [name_requester, phone_requester, problem, summary, num_id, year_id],
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

// Controlador para finalizar uma serviço pelo ID
export const finalizeById = (req: Request, res: Response) => {
  // #swagger.tags = ['Service']

  const { num_id, year_id } = req.params;
  const { summary, users } = req.body;

  // Array de promessas para cada criação
  const finalizePromises = [];

  // Adiciona os Users
  for (let count = 0; count < users.length; count++) {
    finalizePromises.push(new Promise((resolve, reject) => {
      db.query("INSERT INTO service_user (id_service_year, id_service_num, id_user) VALUES (?,?,?)",
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

  // Finaliza o Service
  finalizePromises.push(new Promise((resolve, reject) => {
    db.query("UPDATE service SET summary = ?, ended_at = NOW(), is_closed = TRUE WHERE num_id LIKE ? AND year_id LIKE ?",
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

// Controlador para excluir uma serviço pelo ID
export const deleteById = (req: Request, res: Response) => {
  // #swagger.tags = ['Service']
  
  const { num_id, year_id } = req.params;

  // Array de promessas para cada exclusão
  const deletePromises = [];

  // Adicionando as promessas de exclusão ao array
  deletePromises.push(new Promise((resolve, reject) => {
    db.query("DELETE FROM service_user WHERE id_service_num LIKE ? AND id_service_year LIKE ?",
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
    db.query("DELETE FROM service_device WHERE id_service_num LIKE ? AND id_service_year LIKE ?",
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
    db.query("DELETE FROM service WHERE num_id LIKE ? AND year_id LIKE ?",
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
