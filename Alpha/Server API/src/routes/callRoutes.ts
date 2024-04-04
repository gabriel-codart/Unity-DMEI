import express from "express";
import * as callController from '../controllers/callController';

const router = express.Router();

router.get('/', callController.getAll);
router.get('/:year_id/:num_id', callController.getById);
router.post('/', callController.create);
router.put('/:year_id/:num_id', callController.updateById);
router.put('/:year_id/:num_id/finalize', callController.finalizeById);
router.delete('/:year_id/:num_id', callController.deleteById);


export default router;