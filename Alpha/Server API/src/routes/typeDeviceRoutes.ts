import express from "express";
import * as typeMachineController from '../controllers/typeDeviceController';

const router = express.Router();

router.get('/', typeMachineController.getAll);
router.get('/:id', typeMachineController.getById);
router.post('/', typeMachineController.create);
router.put('/:id', typeMachineController.updateById);
router.delete('/:id', typeMachineController.deleteById);

export default router;