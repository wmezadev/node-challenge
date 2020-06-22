const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');
const chatroom = require('../components/chatroom/network');

const routes = function(server) {
    server.use('/message', message);
    server.use('/user', user);
    server.use('/chatroom', chatroom);
}

module.exports = routes;