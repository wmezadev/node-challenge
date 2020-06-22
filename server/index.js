require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));
server.listen(process.env.APP_PORT, function() {
    console.log(`The API is listen in ${process.env.APP_URL}:${process.env.APP_PORT}`);
});