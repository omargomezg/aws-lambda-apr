const express = require('express')
const bodyParser = require('body-parser')
const packageJson = require('../package.json')
const cors = require('cors')

const routes = require('./routes')

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.get('/healthcheck', function(req, res, next) {
    res.send({
        name: packageJson.name,
        version: packageJson.version,
        author: packageJson.author,
        description: [packageJson.description]
    })
})
app.use('/', routes);

module.exports = app;
