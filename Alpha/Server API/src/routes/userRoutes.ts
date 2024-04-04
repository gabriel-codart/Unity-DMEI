import express from "express";
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/login', userController.login);
router.post('/', userController.create);
router.put('/:id', userController.updateById);
router.delete('/:id', userController.deleteById);

export default router;