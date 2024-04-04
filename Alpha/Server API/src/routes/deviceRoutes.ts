import express from "express";
import * as machineController from '../controllers/deviceController';

const router = express.Router();

router.get('/', machineController.getAll);
router.get('/:id', machineController.getById);
router.post('/', machineController.create);
router.put('/:id', machineController.updateById);
router.delete('/:id', machineController.deleteById);

export default router;