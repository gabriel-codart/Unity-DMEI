import express from "express";
import * as entityController from '../controllers/entityController';

const router = express.Router();

router.get('/', entityController.getAll);
router.get('/:id', entityController.getById);
router.post('/', entityController.create);
router.put('/:id', entityController.updateById);
router.delete('/:id', entityController.deleteById);

export default router;