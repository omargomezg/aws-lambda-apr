const express = require('express')
const meterService = require('../service/meter')

const service = new meterService()

const router = express.Router();

router.route('/')
    .get( async (req, res) => {
        try {
            const result = await service.getAll(req.query);
            res.status(200).json(result)
        }
        catch(ex) {
            res.status(200).json(ex)
        }
    })
    .post(async (req, res) => {
        const result = await service.create(req.body);
        res.status(201).json(result)
    })
    .put(async (req, res) => {
        const result = await service.update(req.body);
        res.status(200).json(result)
    });

router.route('/account')
    .get(async (req, res) => {

    })

module.exports = router;
