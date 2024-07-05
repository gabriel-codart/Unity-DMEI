import express from "express";
import * as deviceTypeController from '../controllers/deviceTypeController';

const router = express.Router();

router.get('/', deviceTypeController.getAll);
router.get('/:id', deviceTypeController.getById);
router.post('/', deviceTypeController.create);
router.put('/:id', deviceTypeController.updateById);
router.delete('/:id', deviceTypeController.deleteById);

export default router;