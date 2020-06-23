const store = require('./store');
const socket = require('../../socket').socket;
const bot = require('../bot/controller');

function addMessage(chat, user, message) {
    return new Promise ((resolve, reject) => {
        if(!chat || !user || !message){
            console.error('[messageController] no user or message');
            reject('Invalid data');
            return false;
        }

        // search for bot stock command
        const isCommand = message.search(/stock=/);
        const lastIndexOfCommand = message.lastIndexOf(/stock=/);

        if(isCommand) {
            const stock_code = message.substring(lastIndexOfCommand, message.length);
            const botMessage = bot.getStock(stock_code).then(resp => {
                socket.io.emit('message', botMessage);
                console.log(resp);
            });
        }
        
        const fullMessage = {
            chatroom: chat,
            user: user,
            message: message,
            created_at: new Date()
        }

        socket.io.emit('message', fullMessage);
        store.add(fullMessage);
        resolve(fullMessage);
    });
}

function getMessages (filterChat) {
    return new Promise ((resolve, reject) => {
        resolve(store.list(filterChat));
    });
}

module.exports = {
    addMessage,
    getMessages,
};