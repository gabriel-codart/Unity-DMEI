import express from "express";

import userRoutes from './userRoutes';
import entityRoutes from './entityRoutes';
import deviceRoutes from './deviceRoutes';
import deviceTypeRoutes from './deviceTypeRoutes';

import serviceRoutes from './serviceRoutes';
import callRoutes from './callRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/entities', entityRoutes);
router.use('/devices', deviceRoutes);
router.use('/typeDevices', deviceTypeRoutes);

router.use('/services', serviceRoutes);
router.use('/calls', callRoutes);

export default router;