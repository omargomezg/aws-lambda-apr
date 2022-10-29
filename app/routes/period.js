const express = require('express')
const PeriodService = require('../service/period')

const service = new PeriodService()

const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            const result = await service.getAll(req.query);
            res.status(200).json(result)
        }
        catch(ex) {
            res.status(200).json(ex)
        }
    });

router
    .post('/', async (req, res) => {
        const result = await service.create(req.body);
        res.status(201).json(result)
    });

router
    .put('/', async (req, res) => {
        const result = await service.update(req.body);
        res.status(200).json(result)
    });

module.exports = router;
