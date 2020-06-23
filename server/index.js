require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const db = require('./db');
const socket = require('./socket');
const router = require('./network/routes');
const bodyParser = require('body-parser');

db.connect(process.env.DB_URL);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);
router(app);
server.listen(process.env.APP_PORT, function() {
    console.log(`The API is listen in ${process.env.APP_URL}:${process.env.APP_PORT}`);
});