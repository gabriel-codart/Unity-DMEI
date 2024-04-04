import express from "express";

import userRoutes from './userRoutes';
import entityRoutes from './entityRoutes';
import deviceRoutes from './deviceRoutes';
import typeDeviceRoutes from './typeDeviceRoutes';

import serviceRoutes from './serviceRoutes';
import callRoutes from './callRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/entities', entityRoutes);
router.use('/devices', deviceRoutes);
router.use('/typeDevices', typeDeviceRoutes);

router.use('/services', serviceRoutes);
router.use('/calls', callRoutes);

export default router;