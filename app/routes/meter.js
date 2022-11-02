const express = require('express')
const service = require('../service/meter')

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
        const result = await service.update(req.body);
        res.status(200).json(result)
    });


router
    .get('/:serial', async (req, res) => {
        try {
            const meter = await service.getBySerial(req.params.serial)
            res.status(200).json(meter)
        } catch (ex) {
            res.status(500).json(ex)
        }
    })

router.route('/account')
    .get(async (req, res) => {

    })

module.exports = router;
