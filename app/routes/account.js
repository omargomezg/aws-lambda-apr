const express = require('express')
const AccountService = require('../service/account')

const accountService = new AccountService()

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const result = await accountService.getAll(req.query);
            res.status(200).json(result)
        }
        catch(ex) {
            res.status(500).json(ex)
        }
    })
    .post(async (req, res) => {
        const result = await accountService.create(req.body);
        res.status(201).json(result)
    })
    .put(async (req, res) => {
        const result = await accountService.update(req.body);
        res.status(200).json(result)
    });

router.route('/meter')
    .get(async (req, res) => {
        try {
            const result = await accountService.meterInAccount(req.query);
            res.status(200).json(result)
        }
        catch(ex) {
            res.status(500).json(ex)
        }
    })

module.exports = router;
