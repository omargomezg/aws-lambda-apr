const express = require('express')
const tariffService = require('../service/tariff')

const service = new tariffService()

const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            const result = await service.getAll(req.query);
            res.status(200).json(result)
        } catch (ex) {
            res.status(500).json(ex)
        }
    });

router
    .post('/', async (req, res) => {
        const result = await service.create(req.body);
        res.status(201).json(result)
    });

router
    .put('/', async (req, res) => {
        const result = await service.getAll(req.body);
        res.status(200).json(result)
    });

router
    .delete('/:id', async (req, res) => {
        //const result = await service.getAll(req.body);
        res.status(200).json(req)
    });

module.exports = router;
