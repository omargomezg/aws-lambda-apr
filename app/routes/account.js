const express = require('express')
const service = require('../service/account')


const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const result = await service.getAll(req.query);
            res.status(200).json(result)
        }
        catch (ex) {
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


/**
 * All operations related to meter in account
 */
router.route('/meter/:serial')
    .get(async (req, res) => {
        try {
            const result = await service.meterInAccount(req.params.serial);
            res.status(200).json(result)
        }
        catch (ex) {
            res.status(500).json(ex)
        }
    })

module.exports = router;
