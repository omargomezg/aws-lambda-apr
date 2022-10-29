const express = require('express')
const AccountService = require('../service/account')

const accountService = new AccountService()

const router = express.Router();

router
    .get('/meter', async (req, res) => {
        try {
            const result = await accountService.getAll(req.query);
            res.status(200).json(result)
        }
        catch(ex) {
            res.status(200).json(ex)
        }
    });

module.exports = router;
