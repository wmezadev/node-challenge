const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chatname: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.ObjectId,
        ref: 'User',
    }]
});

const model = mongoose.model('Chatroom', mySchema);
module.exports = model;