'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

const routes = require('./routes')

app.use(cors());
app.use(bodyParser.json());
app.get('/healthcheck', function (req, res, next) {
    res.send({
        name: packageJson.name,
        version: packageJson.version,
        author: packageJson.author,
        description: [packageJson.description]
    })
})
app.use('/', routes);

app.listen(3000, ()=> console.log('Running server in port ' + 3000));