import express from "express";
import * as serviceController from '../controllers/serviceController';

const router = express.Router();

router.get('/', serviceController.getAll);
router.get('/:year_id/:num_id', serviceController.getById);
router.post('/', serviceController.create);
router.put('/:year_id/:num_id', serviceController.updateById);
router.put('/:year_id/:num_id/finalize', serviceController.finalizeById);
router.delete('/:year_id/:num_id', serviceController.deleteById);

export default router;