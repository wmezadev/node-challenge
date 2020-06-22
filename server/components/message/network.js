const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/:chatroom', auth, function(req, res) {
    controller.getMessages(req.params.chatroom)
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    })
});

router.post('/', auth, function(req, res) {

    controller.addMessage(req.body.chatroom, req.user.id, req.body.message)
    .then(fullMessage => {
        response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
        response.error(req, res, 'Invalid data', 400, 'Controller error');
    });
});

module.exports = router;