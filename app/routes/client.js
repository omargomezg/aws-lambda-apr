const express = require('express')
const ClientService = require('../service/client')

const service = new ClientService()

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const result = await service.getAll(req.query);
            res.status(200).json(result)
        } catch (ex) {
            res.status(500).json(ex)
        }
    })
    .post(async (req, res) => {
        const result = await service.create(req.body);
        res.status(201).json(result)
    })
    .put(async (req, res) => {
        const result = await service.getAll(req.body);
        res.status(200).json(result)
    });

module.exports = router;
