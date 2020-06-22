const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', function(req, res) {
    controller.getUsers()
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'Invalid information', 500, 'Controller error');
    })
});

router.post('/signup', function(req, res) {
    controller.createUser(req.body.username, req.body.password)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, e, 500, 'Controller error');
    });
});


module.exports = router;