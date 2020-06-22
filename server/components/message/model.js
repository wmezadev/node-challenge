const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chatroom: {
        type: Schema.ObjectId,
        ref: 'Chatroom'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    created_at: Date
});

const model = mongoose.model('Message', mySchema);
module.exports = model;