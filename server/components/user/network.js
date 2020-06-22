const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth, function(req, res) {
    controller.getUsers()
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'Invalid information', 500, 'Controller error');
    })
});

router.post('/login', function(req, res) {
    controller.login(req.body.username, req.body.password)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, e, 500, 'Controller error');
    })
});

router.post('/signup', function(req, res) {
    controller.signup(req.body.username, req.body.password)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, e, 500, 'Controller error');
    });
});


module.exports = router;