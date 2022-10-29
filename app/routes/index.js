const express = require('express');
const clientRoutes = require('./client');
const accountRoutes = require('./account');
const periodRoutes = require('./period');
const userRoutes = require('./user');
const meterRoutes = require('./meter');
const tariffRoutes = require('./tariff');

const router = express.Router();

router.use('/client', clientRoutes);
router.use('/account', accountRoutes);
router.use('/period', periodRoutes);
router.use('/user', userRoutes);
router.use('/meter', meterRoutes);
router.use('/tariff', tariffRoutes);

module.exports = router;
